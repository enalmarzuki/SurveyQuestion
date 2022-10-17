import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Gap } from '../../../../Components';
import { IFormikValues } from '../../Hooks/useHomeHooks';
import Styles from '../../Home.module.scss';

interface IItemCardProps {
  label: string;
  value: string;
}

interface ICardQuestionProps {
  data: IFormikValues;
  onIsEdit: (arg: boolean) => void;
  onEditIndex: () => void;
  onShowDeleteConfirm: () => void;
}

const ItemCard: React.FC<IItemCardProps> = ({ label, value }) => {
  return (
    <div className={Styles['card-content-wrapper']}>
      <p className={Styles['text-card']}>{label}</p>
      <p className={Styles['text-card-value']}>{value}</p>
    </div>
  );
};

export const CardQuestion: React.FC<ICardQuestionProps> = ({
  data,
  onEditIndex,
  onIsEdit,
  onShowDeleteConfirm,
}) => {
  return (
    <Card
      actions={[
        <EditOutlined
          key="edit"
          onClick={() => {
            onIsEdit(true);
            onEditIndex();
          }}
        />,
        <DeleteOutlined key="delete" onClick={() => onShowDeleteConfirm()} />,
      ]}
    >
      <ItemCard label="Question" value={data?.question} />

      <Gap height={16} />
      {data.options?.map((item, i) => (
        <div key={i}>
          <ItemCard label={`Answer ${i + 1}`} value={item.answer} />
          <Gap height={16} />
          <ItemCard label={`Rule ${i + 1}`} value={item.optionRule} />
          <Gap height={16} />
        </div>
      ))}
    </Card>
  );
};
