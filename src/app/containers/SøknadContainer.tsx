import * as React from 'react';
import { Prompt, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import _ from 'lodash';

import { sendSoknad } from 'actions/api/apiActionCreators';
import Person from 'app/types/domain/Person';
import { FormProps } from 'app/connected-components/engangsstonad-steg/FormProps';

import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import SkjemaHeader from 'components/skjema-header/SkjemaHeader';
import CancelButton from 'components/cancel-button/CancelButton';
import UtløptSesjonModal from 'components/utløpt-sesjon-modal/UtløptSesjonModal';
import ValidationErrorSummaryBase, {
    ValidationSummaryError
} from 'components/validation-error-summary/ValidationErrorSummaryBase';

import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';

import { Language } from 'intl/IntlProvider';
import { mapFormStateToEngangsstonadDto } from 'util/formStateToEngangsttonadDtoMapper';
import { AppState } from 'reducers/index';

import getStepConfig from '../connected-components/engangsstonad-steg/steg.config';

import './søknadContainer.less';

interface OwnProps {
    language: Language;
    person: Person;
    søknadSendingInProgress: boolean;
    sessionHasExpired: boolean;
}

type Props = OwnProps & DispatchProps & RouteComponentProps;
const SøknadContainer: React.FunctionComponent<Props> = ({
    person,
    søknadSendingInProgress,
    sessionHasExpired,
    language,
    dispatch
}) => {
    const intl = useIntl();
    const [activeStepIndex, setActiveStepIndex] = React.useState(0);

    const stepsConfig = getStepConfig(intl, person);
    const ActiveStep = stepsConfig[activeStepIndex];

    const onSubmit = (values: Partial<FormProps>, formikHelpers: FormikHelpers<Partial<FormProps>>) => {
        formikHelpers.setStatus({ hasSubmitted: false });
        activeStepIndex === stepsConfig.length - 1
            ? dispatch(sendSoknad(mapFormStateToEngangsstonadDto(values, language)))
            : setActiveStepIndex(activeStepIndex + 1);
    };

    const handleBackClicked = (formikProps: FormikProps<Partial<FormProps>>) => {
        if (activeStepIndex > 0) {
            formikProps.setStatus({ hasSubmitted: false });
            formikProps.setErrors({});
            setActiveStepIndex(activeStepIndex - 1);
        }
    };

    const getErrorMessages = (formikProps: FormikProps<Partial<FormProps>>): ValidationSummaryError[] => {
        return Object.entries(formikProps.errors).map((error) => ({
            name: error[0],
            message: error[1] as string
        }));
    };

    const shouldRenderSubmitButton = ({ values }: FormikProps<Partial<FormProps>>): boolean => {
        try {
            if (ActiveStep.validationSchema) {
                ActiveStep.validationSchema(intl).validateSync(values, { abortEarly: false });
            }
            return true;
        } catch (error) {
            return !error.inner.some((err: any) => err.type === 'required' || err.type === 'min');
        }
    };

    return (
        <>
            <Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} />
            <Formik
                initialValues={{
                    terminberkreftelse: [],
                    oppholdNeste12Mnd: [],
                    oppholdSiste12Mnd: []
                }}
                validationSchema={ActiveStep.validationSchema}
                onSubmit={onSubmit}
                render={(formikProps: FormikProps<Partial<FormProps>>) => {
                    return (
                        <div className="responsiveContainer">
                            <SkjemaHeader
                                onPrevious={() => handleBackClicked(formikProps)}
                                activeStep={activeStepIndex + 1}
                                stepTitles={stepsConfig.map((stepConf) => stepConf.stegIndikatorLabel)}
                            />

                            <Form>
                                {formikProps.status?.hasSubmitted && !_.isEmpty(formikProps.errors) && (
                                    <ValidationErrorSummaryBase
                                        title={getMessage(intl, 'title')}
                                        errors={getErrorMessages(formikProps)}
                                    />
                                )}
                                {ActiveStep.component({ formikProps, intl, language })}
                                {shouldRenderSubmitButton(formikProps) && (
                                    <Hovedknapp
                                        className="responsiveButton"
                                        disabled={søknadSendingInProgress}
                                        spinner={søknadSendingInProgress}
                                        onClick={() => formikProps.setStatus({ hasSubmitted: true })}
                                    >
                                        {ActiveStep.fortsettKnappLabel}
                                    </Hovedknapp>
                                )}
                                <CancelButton />
                            </Form>
                        </div>
                    );
                }}
            />
            <Prompt message={getMessage(intl, 'søknadContainer.prompt')} />
            <UtløptSesjonModal erÅpen={sessionHasExpired} />q
        </>
    );
};

const mapStateToProps = (state: AppState) => ({
    language: state.commonReducer.language,
    person: state.apiReducer.person!,
    søknadSendingInProgress: state.apiReducer.søknadSendingInProgress,
    sessionHasExpired: state.apiReducer.sessionHasExpired
});
export default connect<OwnProps>(mapStateToProps)(SøknadContainer);
