import { EngangssoknadSoknadDto } from 'app/types/domain/EngangsstonadSoknad';
import { FormProps } from 'app/connected-components/engangsstonad-steg/FormProps';
import { Language } from 'intl/IntlProvider';

export const mapFormStateToEngangsstonadDto = (
    values: Partial<FormProps>,
    language: Language
): EngangssoknadSoknadDto => {
    return {
        type: 'engangsstønad',
        erEndringssøknad: false,
        barn: {
            erBarnetFødt: values.erFødt,
            antallBarn: values.numberOfChildren,
            fødselsdatoer: values.erFødt ? values.fodselsdato : undefined,
            termindato: !values.erFødt ? values.termindato : undefined,
            terminbekreftelse: !values.erFødt ? values.terminberkreftelse! : [],
            terminbekreftelseDato: !values.erFødt ? values.terminberkreftelseDato : undefined
        },
        annenForelder: {
            kanIkkeOppgis: values.kanIkkeOppgis,
            navn: !values.kanIkkeOppgis ? values.navn : undefined,
            fnr: !values.kanIkkeOppgis ? values.fodselsnummer : undefined,
            utenlandskFnr: !values.kanIkkeOppgis ? values.utenlandskFodselsnummer : undefined,
            bostedsland: !values.kanIkkeOppgis && values.utenlandskFodselsnummer ? values.bostedsland : undefined
        },
        informasjonOmUtenlandsopphold: {
            tidligereOpphold: values.harVærtIUtlandSiste12Mnd ? values.oppholdSiste12Mnd! : [],
            senereOpphold: values.skalVæreIUtlandNeste12Mnd ? values.oppholdNeste12Mnd! : []
        },
        søker: {
            språkkode: language
        }
    };
};