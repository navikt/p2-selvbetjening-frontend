import { Language } from "intl/IntlProvider";

export enum CommonActionKeys {
    'SET_BEKREFTET_INFORMASJON' = 'setBekreftetInformasjon',
    'SET_GODKJENT_VILKÅR' = 'setGodkjentVilkår',
    'SET_LANGUAGE' = 'setLanguage'
}

interface SetBekreftetInformasjon {
    type: CommonActionKeys.SET_BEKREFTET_INFORMASJON;
    bekreftetInformasjon: boolean;
}

interface SetGodkjentVilkar {
    type: CommonActionKeys.SET_GODKJENT_VILKÅR;
    godkjentVilkår: boolean;
}

interface SetLanguage {
    type: CommonActionKeys.SET_LANGUAGE;
    language: Language;
}

export type CommonActionTypes =
    | SetBekreftetInformasjon
    | SetGodkjentVilkar
    | SetLanguage;
