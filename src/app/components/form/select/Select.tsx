import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field } from 'formik';
import { Select as NavSelect } from 'nav-frontend-skjema';
import { guid } from 'nav-frontend-js-utils';
import { getErrorMessage } from '../utils';

interface Props {
    name: string;
    options: Array<{
        value: string | number;
        label: string;
    }>;
}

const Select: React.StatelessComponent<Props> = ({ name, options }) => {
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps) => {
                return (
                    <NavSelect
                        bredde="fullbredde"
                        label={<FormattedMessage id={`spørsmål.${name}`} />}
                        onChange={(e) => {
                            form.setFieldValue(field.name, e.target.value);
                            form.setFieldTouched(field.name, true, false);
                        }}
                        value={field.value}
                        feil={getErrorMessage(form, name)}
                    >
                        <option key={guid()} value={''} />
                        {options.map((option) => {
                            return (
                                <option key={guid()} value={option.value}>
                                    {option.label}
                                </option>
                            );
                        })}
                    </NavSelect>
                );
            }}
        />
    );
};
export default Select;
