import React from 'react';
import { Form as AntForm, Input, Button } from 'antd';

const initialValues = {
  todo: '',
};

type Props = {
  onSubmit: (todo: string) => Promise<unknown>;
  todo?: string;
  genre?: string;
};

const KondateForm: React.FC<Props> = ({ onSubmit, todo = initialValues.todo }) => {
  const [form] = AntForm.useForm();

  const handleFinish = async ({ todo }: typeof initialValues) => {
    await onSubmit(todo);
    form.resetFields();
  };

  return (
    <>
      <AntForm form={form} initialValues={{ todo }} onFinish={handleFinish}>
        <AntForm.Item
          className="input-wrap"
          label="献立"
          name="todo"
          rules={[{ required: true, message: '献立を入力してください' }]}
        >
          <Input placeholder="献立を入力してください" />
        </AntForm.Item>
        <div className="btn-wrap">
          <Button type="primary" htmlType="submit">
            {todo ? 'update' : '登録'}
          </Button>
        </div>
      </AntForm>

      <style jsx>{`
        .btn-wrap {
          margin-top: 1rem;
          display: flex;
          justify-content: flex-end;
        }
        .input-wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
      `}</style>
    <dt>ジャンル</dt>
    <dd>
      <select id = 'genre'>
        <option value = '和食'>和食</option>
        <option value = '洋食'>洋食</option>
        <option value = 'イタリアン・フレンチ'>イタリアン・フレンチ</option>
        <option value = '中華'>中華</option>
        <option value = '焼肉・ホルモン'>焼肉・ホルモン</option>
        <option value = '韓国料理'>韓国料理</option>
        <option value = 'アジア・エスニック料理'>アジア・エスニック料理</option>
        <option value = 'ラーメン'>ラーメン</option>
        <option value = 'お好み焼き・もんじゃ'>お好み焼き・もんじゃ</option>
        <option value = 'その他'>その他</option>
      </select>
    </dd>
    </>
  );
};

export default KondateForm;