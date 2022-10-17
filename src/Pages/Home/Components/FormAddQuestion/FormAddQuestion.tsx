import React, { useMemo } from 'react';
import { Input, Button, Select, Form, Row, Col } from 'antd';
import { FormikProps } from 'formik';
import { IFormikValues } from '../../Hooks/useHomeHooks';
import { listOptionRules } from '../../../../Data/Constans/Home';
import Styles from './FormAddQuestion.module.scss';
import { Gap } from '../../../../Components';
import { DeleteTwoTone } from '@ant-design/icons';

interface IFormAddQuestionProps {
  formik: FormikProps<IFormikValues>;
  onClickAddOption: () => void;
  onClickDeleteOption: (arg: number) => void;
  isEdit: boolean;
}

const { Option } = Select;

export const FormAddQuestion: React.FC<IFormAddQuestionProps> = ({
  formik,
  onClickAddOption,
  onClickDeleteOption,
  isEdit,
}) => {
  const onChangeOption = (value: string, index: number) => {
    return formik.setFieldValue(`options.${index}.optionRule`, value);
  };

  const onCheckError = (key: string) =>
    Object.keys(formik.errors).includes(key) ? 'error' : '';

  const memoizedListOption = useMemo(
    () =>
      listOptionRules.map((item) => (
        <Option key={item.id} value={item.value}>
          {item.label}
        </Option>
      )),
    []
  );

  return (
    <div className={Styles['form-container']}>
      <Form layout="vertical">
        <Form.Item
          label="What is your question"
          validateStatus={onCheckError('question')}
          style={{ width: '100%' }}
        >
          <Input
            size="large"
            autoComplete="off"
            placeholder="Type here your question"
            {...formik.getFieldProps('question')}
          />
        </Form.Item>

        <Gap height={16} />
        {formik.values.options?.map((option, index) => (
          <div key={index}>
            <div className={Styles['form-option-wrapper']}>
              <Form.Item
                label="Rule"
                validateStatus={onCheckError(`options.${index}.optionRule`)}
                style={{ flex: 1 }}
              >
                <Select
                  size="large"
                  value={option.optionRule}
                  onChange={(val) => onChangeOption(val, index)}
                >
                  {memoizedListOption}
                </Select>
              </Form.Item>

              <Gap width={16} />
              <Form.Item
                label="Answer"
                validateStatus={onCheckError(`options.${index}.answer`)}
                style={{ flex: 2 }}
              >
                <Input
                  size="large"
                  autoComplete="off"
                  placeholder="Type here your answer"
                  {...formik.getFieldProps(`options.${index}.answer`)}
                />
              </Form.Item>

              <Gap width={16} />
              <Form.Item label=" ">
                <Button
                  danger
                  icon={<DeleteTwoTone twoToneColor="#ff0000" />}
                  size="large"
                  ghost
                  disabled={formik.values.options.length === 1}
                  onClick={() => onClickDeleteOption(index)}
                />
              </Form.Item>
            </div>
            <Gap height={16} />
          </div>
        ))}
        <Gap height={16} />

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Button
              size="large"
              onClick={onClickAddOption}
              style={{ width: '100%' }}
              disabled={formik.isSubmitting}
            >
              Add Option
            </Button>
          </Col>
          <Col span={12}>
            <Button
              size="large"
              type="primary"
              onClick={() => formik.handleSubmit()}
              style={{ width: '100%' }}
              disabled={
                !(formik.dirty && formik.isValid) || formik.isSubmitting
              }
              loading={formik.isSubmitting}
            >
              {isEdit ? 'Edit' : 'Submit'} Question
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
