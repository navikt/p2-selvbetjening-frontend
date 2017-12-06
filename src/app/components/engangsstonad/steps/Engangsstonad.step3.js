import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import DialogBox from '../../../components/shared/DialogBox';
import RadioGroupField from '../../../redux/form/components/RadioGroupField';
import RadioOption from '../../../redux/form/components/RadioOption';
import IconWithText from './../../shared/IconWithText';

import ElementWrapper from '../../../util/ElementWrapper';

export const Step3 = () => (
    <ElementWrapper>
        <DialogBox type="info">
            <Normaltekst>
                Vi fant denne informasjonen om din adresse og trenger
                at du svarer på tre spørsmål om ditt opphold i Norge
            </Normaltekst>
        </DialogBox>
        <IconWithText kind="arbeidsgiver" text="Adresse" />
        <Normaltekst>Stockholmsgata 16B</Normaltekst>
        <Normaltekst>0566, Oslo</Normaltekst>
        <Normaltekst>Norge</Normaltekst>
        <RadioGroupField name="oppholdSisteAr" title="Har du oppholdt deg i Norge de siste 12 månedene?">
            <RadioOption label="Ja" value />
            <RadioOption label="Nei" value={false} />
        </RadioGroupField>
        <RadioGroupField name="oppholdNavarende" title="Oppholder du deg i Norgen nå?">
            <RadioOption label="Ja" value />
            <RadioOption label="Nei" value={false} />
        </RadioGroupField>
        <RadioGroupField name="oppholdNesteAr" title="Skal du oppholde deg i Norge de neste 12 månedene?">
            <RadioOption label="Ja" value />
            <RadioOption label="Nei" value={false} />
        </RadioGroupField>
    </ElementWrapper>
);
export default Step3;