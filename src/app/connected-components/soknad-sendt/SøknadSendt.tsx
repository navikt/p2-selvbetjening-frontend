import * as React from 'react';
import 'moment/locale/nb';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Ingress, Undertittel } from 'nav-frontend-typografi';
import * as moment from 'moment';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';
import CustomSVG from 'common/components/custom-svg/CustomSVG';
import getMessage from 'util/i18n/i18nUtils';
import Kvittering from 'app/types/services/Kvittering';
import Person from '../../types/domain/Person';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import { Language } from 'intl/IntlProvider';

import 'nav-frontend-lenker-style';

const SpotlightLetter = require('assets/svg/spotlight_letter.svg').default;

import { lenker } from 'util/lenker';
import { redirect } from 'util/login';

import '../../styles/engangsstonad.less';

interface StateProps {
    person: Person;
    kvittering: Kvittering;
}

type Props = StateProps & InjectedIntlProps;

class SøknadSendt extends React.Component<StateProps & InjectedIntlProps> {
    constructor(props: Props) {
        super(props);
        moment.locale(Language.BOKMÅL);
    }

    componentDidMount() {
        setTimeout(() => {
            if ((window as any).hj) {
                (window as any).hj('trigger', 'es_kvittering_feedback');
            }
        }, 5000);
    }

    receiptText() {
        const { kvittering } = this.props;
        return kvittering.saksNr ? (
            <FormattedMessage
                id="kvittering.text.soknadMottattMedSaksnummer"
                values={{
                    klokkeslett: moment(kvittering.mottattDato).format('HH:mm'),
                    dato: moment(kvittering.mottattDato).format('LL'),
                    saksNr: kvittering.saksNr
                }}
            />
        ) : (
            <FormattedMessage
                id="kvittering.text.soknadMottatt"
                values={{
                    klokkeslett: moment(kvittering.mottattDato).format('HH:mm'),
                    dato: moment(kvittering.mottattDato).format('LL')
                }}
            />
        );
    }

    bankAccountText(kontonummer: string) {
        return (
            <FormattedMessage
                id="kvittering.text.kontonummer"
                values={{
                    kontonummer,
                    dinProfilLink: (
                        <Lenke href={lenker.brukerprofil}>
                            <FormattedMessage id="kvittering.text.soknadMottatt.dinProfilLink" />
                        </Lenke>
                    )
                }}
            />
        );
    }

    render() {
        const { intl, person } = this.props;

        return (
            <div className="engangsstonad">
                <DocumentTitle title={getMessage(intl, 'kvittering.sectionheading')} />
                <Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} />
                <div className="responsiveContainer">
                    <CustomSVG iconRef={SpotlightLetter} className="spotlightLetter" />
                    <Innholdstittel className="blokk-s">
                        {getMessage(intl, 'kvittering.text.takk')}
                        <span className="capitalizeName"> {person.fornavn.toLowerCase()}!</span>
                    </Innholdstittel>
                    <Ingress className="blokk-xs">{this.receiptText()}</Ingress>
                    <Undertittel className="blokk-xs">
                        {getMessage(intl, 'kvittering.text.hvorFinnerJegStatus')}
                    </Undertittel>
                    <Ingress className="blokk-xs">
                        <FormattedMessage
                            id="kvittering.text.dittNav"
                            values={{
                                dittNavLink: (
                                    <Lenke href={lenker.foreldrepenger}>
                                        <FormattedMessage id="kvittering.text.dittNavLink" />
                                    </Lenke>
                                )
                            }}
                        />
                    </Ingress>

                    {person.bankkonto && person.bankkonto.kontonummer && (
                        <Ingress className="blokk-s">{this.bankAccountText(person.bankkonto.kontonummer)}</Ingress>
                    )}
                    <Hovedknapp
                        className="responsiveButton responsiveButton--søknadSendt"
                        onClick={() => redirect(lenker.dittNav)}
                    >
                        {getMessage(intl, 'kvittering.text.soknadMottatt.avsluttText')}
                    </Hovedknapp>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
    kvittering: state.apiReducer.kvittering
});

export default connect<StateProps>(mapStateToProps)(injectIntl(SøknadSendt));
