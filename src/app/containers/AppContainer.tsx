import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import Spinner from 'nav-frontend-spinner';
import { AxiosResponse } from 'axios';

import { apiActionCreators as api } from '../redux/actions';
import { DispatchProps } from 'common/redux/types';
import Person from '../types/domain/Person';
import Kvittering from '../types/services/Kvittering';
import Skjema from './SøknadContainer';
import { erMyndig, erMann } from 'util/validation/validationUtils';
import { AppState } from 'reducers/index';

import ErMann from '../pages/feilsider/ErMann';
import IkkeMyndig from '../pages/feilsider/IkkeMyndig';
import Intro from '../pages/intro/Intro';
import InnsendingFeilet from '../pages/feilsider/InnsendingFeilet';
import GenerellFeil from '../pages/feilsider/GenerellFeil';
import SøknadSendt from '../pages/soknad-sendt/SøknadSendt';

import '../styles/engangsstonad.less';
interface StateProps {
    person?: Person;
    error: AxiosResponse | Error | undefined;
    isLoadingPerson: boolean;
    godkjentVilkår: boolean;
    kvittering?: Kvittering;
    søknadSendt: boolean;
}

type Props = StateProps & DispatchProps;
class AppContainer extends React.Component<Props> {
    componentWillMount() {
        if (!this.props.person) {
            this.props.dispatch(api.getPerson());
        }
    }

    getIntroComponent(person: Person, routeProps: RouteComponentProps): React.ReactNode {
        if (erMann(person)) {
            return <ErMann />;
        }
        if (!erMyndig(person)) {
            return <IkkeMyndig />;
        }
        return <Intro {...routeProps} />;
    }

    render() {
        const { godkjentVilkår, kvittering, error, isLoadingPerson, søknadSendt, person } = this.props;
        if (isLoadingPerson || (error && (error as AxiosResponse).status === 401)) {
            return <Spinner type="XXL" />;
        }
        if (søknadSendt && error && (error as AxiosResponse).status > 401) {
            return <InnsendingFeilet error={error} />;
        }
        if (error || !person) {
            return <GenerellFeil />;
        }
        return (
            <Switch>
                {kvittering ? (
                    <Route path="/engangsstonad" component={SøknadSendt} exact={true} />
                ) : (
                    <Route
                        path="/engangsstonad"
                        render={(routeProps) => this.getIntroComponent(person, routeProps)}
                        exact={true}
                    />
                )}
                {godkjentVilkår && !søknadSendt && (
                    <Route path={'/engangsstonad/soknad'} exact={true} strict={true} component={Skjema} />
                )}
                <Redirect to="/engangsstonad" />
            </Switch>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    error: state.apiReducer.error,
    person: state.apiReducer.person,
    isLoadingPerson: state.apiReducer.isLoadingPerson,
    godkjentVilkår: state.commonReducer.godkjentVilkår,
    kvittering: state.apiReducer.kvittering,
    søknadSendt: state.apiReducer.søknadSendt
});

export default connect<StateProps, {}, {}>(mapStateToProps)(hot(AppContainer));
