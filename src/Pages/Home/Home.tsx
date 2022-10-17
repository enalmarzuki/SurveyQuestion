import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Affix, Col, Modal, Row, Typography } from 'antd';
import { Gap } from '../../Components';
import { CardQuestion } from './Components/CardQuestion/CardQuestion';
import { FormAddQuestion } from './Components/FormAddQuestion/FormAddQuestion';
import { Header } from './Components/Header/Header';
import Styles from './Home.module.scss';
import { IFormikValues, useHomeHooks } from './Hooks/useHomeHooks';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;

const Home = () => {
  const {
    formik,
    onClickAddOption,
    onClickDeleteOption,
    onDeleteQuestion,
    listQuestionLocal,
    setIsEdit,
    setEditOnIndex,
    isEdit,
    setListQuestionLocal,
  } = useHomeHooks();

  const showDeleteConfirm = (index: number) => {
    confirm({
      title: 'Are you sure delete this question ?',
      icon: <ExclamationCircleOutlined />,
      content:
        'You will remove this question from the list that has been created.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setEditOnIndex(index);
        onDeleteQuestion(index);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      listQuestionLocal,
      result.source.index,
      result.destination.index
    );

    localStorage.setItem('listQuestion', JSON.stringify(items));
    setListQuestionLocal(items as IFormikValues[]);
  };

  return (
    <div className={Styles['container']}>
      <div className={Styles['content-wrapper']}>
        <Header title="Survey Questions" />
        <Gap height={26} />

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={11}>
            <Affix offsetTop={0}>
              <div className={Styles['form-wrapper']}>
                <Title level={2} className={Styles['left-content-title']}>
                  Add Questions
                </Title>

                <FormAddQuestion
                  formik={formik}
                  onClickAddOption={onClickAddOption}
                  onClickDeleteOption={onClickDeleteOption}
                  isEdit={isEdit}
                />
                <Gap height={20} />
              </div>
            </Affix>
          </Col>
          <Col span={1} />
          <Col xs={24} lg={12}>
            <>
              <Title level={2} className={Styles['left-content-title']}>
                List Questions
              </Title>

              {!listQuestionLocal.length ? (
                <p>For Now The Data Is Empty</p>
              ) : (
                <div>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {listQuestionLocal?.map((item, index) => (
                            <Draggable
                              key={(index + 1).toString()}
                              draggableId={(index + 1).toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  key={index}
                                >
                                  <CardQuestion
                                    data={item}
                                    onEditIndex={() => setEditOnIndex(index)}
                                    onIsEdit={setIsEdit}
                                    onShowDeleteConfirm={() =>
                                      showDeleteConfirm(index)
                                    }
                                  />

                                  <Gap height={16} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              )}
            </>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
