import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { EnumOptionRules } from '../../../Data/Constans/Home';
import FormAddQuestionSchema from './HomeValidator';
import { v4 as uuidv4 } from 'uuid';

export interface IOption {
  optionRule: string;
  answer: string;
}

export interface IFormikValues {
  question: string;
  options: IOption[];
}

const InitialValueOptions = {
  optionRule: EnumOptionRules.May_Select,
  answer: '',
};

const KEY_LOCAL_STORAGE = 'listQuestion';

export const useHomeHooks = () => {
  const [listQuestionLocal, setListQuestionLocal] = useState<IFormikValues[]>(
    []
  );
  const [isEdit, setIsEdit] = useState(false);
  const [editOnIndex, setEditOnIndex] = useState(-1);

  const initialValues = {
    question: '',
    options: [InitialValueOptions],
  };

  const onClickAddOption = () => {
    const tempFormikValues = [...formik.values.options];
    tempFormikValues.push(InitialValueOptions);

    formik.setValues({
      ...formik.values,
      options: tempFormikValues,
    });
  };

  const onClickDeleteOption = (index: number) => {
    const tempFormikValues = [...formik.values.options];
    tempFormikValues.splice(index, 1);

    formik.setValues({
      ...formik.values,
      options: tempFormikValues,
    });
  };

  const onDeleteQuestion = (index: number) => {
    const tempListQues = [...listQuestionLocal];
    tempListQues.splice(index, 1);
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(tempListQues));
    setListQuestionLocal(tempListQues);
    setEditOnIndex(-1);
  };

  const onSubmit = (values: IFormikValues) => {
    formik.setSubmitting(true);
    if (isEdit) {
      let tempListQuestion = [...listQuestionLocal];
      tempListQuestion[editOnIndex].question = values.question;
      tempListQuestion[editOnIndex].options = values.options;

      setTimeout(() => {
        localStorage.setItem(
          KEY_LOCAL_STORAGE,
          JSON.stringify([...tempListQuestion])
        );
        formik.setSubmitting(false);
        setIsEdit(false);
        setEditOnIndex(-1);
        formik.resetForm();
      }, 2000);
    } else {
      setTimeout(() => {
        localStorage.setItem(
          KEY_LOCAL_STORAGE,
          JSON.stringify([...listQuestionLocal, values])
        );
        formik.setSubmitting(false);
        formik.resetForm();
      }, 2000);
    }
  };

  const formik = useFormik<IFormikValues>({
    initialValues,
    onSubmit,
    validationSchema: FormAddQuestionSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    const tempListQuestion = localStorage.getItem(KEY_LOCAL_STORAGE);
    if (tempListQuestion) {
      setListQuestionLocal(JSON.parse(tempListQuestion));
    }
  }, [formik.isSubmitting]);

  useEffect(() => {
    if (isEdit) {
      formik.setValues({
        question: listQuestionLocal[editOnIndex]?.question,
        options: listQuestionLocal[editOnIndex]?.options,
      });
    } else {
      formik.setValues(initialValues);
    }
  }, [isEdit, editOnIndex]);

  return {
    formik,
    listQuestionLocal,
    onClickAddOption,
    onClickDeleteOption,
    onDeleteQuestion,
    setIsEdit,
    setEditOnIndex,
    isEdit,
    setListQuestionLocal,
  };
};
