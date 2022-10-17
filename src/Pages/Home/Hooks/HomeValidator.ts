import * as yup from 'yup';
import { IFormikValues } from './useHomeHooks';

const FormAddQuestionSchema = (): yup.SchemaOf<IFormikValues> =>
  yup
    .object()
    .shape({
      question: yup.string().required('Required'),
      options: yup.array().of(
        yup.object().shape({
          optionRule: yup.string().required('Required'),
          answer: yup.string().required('Required'),
        })
      ),
    })
    .defined();
export default FormAddQuestionSchema;
