import React from 'react';
import { Space, Menu } from 'antd';

import { firestore } from '@/lib/firebase';

import KondateForm from '@/components/molecules/KondateForm';
import KondateTable from './KondateTable';
import generateCalendar from 'antd/lib/calendar/generateCalendar';
import {User} from '@/types/user';
import { time } from 'console';

const today = new Date();
const date1 = today.getDate();
const month1 = today.getMonth()+1;
const year1 = today.getFullYear();

const InputKondate: React.FC = () => {
  const addKondate= (todo: string, genre: string, day: number, month: number, year: number, when: string) =>
    // firestoreにデータを追加する
    firestore.collection('konndate').doc(String(year1)+String(month1)+String(Number(day)+Number(date1)-1)+when).set({
            genre: genre,
            todo: todo,
            isComplete: false,
            date: new Date(),
            year: year1,
            month: month1,
            day: date1+Number(day)-1,
            when: (when === '1') ? '朝ご飯': (when === '2') ? '昼ご飯': (when === '3') ? '夜ご飯': '',
        })
    // // id入力をする
    // const abc = firestore.collection('konndate').doc().id;
    // console.log(abc);

    // firestore.collection("konndate").get().then(function(querySnapshot) {
    //   querySnapshot.forEach(function(doc) {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.id, " => ", doc.data());
    //   });
    // });
    // firestore.collection('konndate').doc(year1 + month1 + date1).set({
    //   genre: 'hello', todo: 'hoge',id: 'sss', isComplete: false, date: new Date, day: 'ok',   
    // });

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="form-wrap">
          <KondateForm onSubmit={addKondate} />
        </div>
        <KondateTable />
        
      </Space>
      <style jsx>{`
        .form-wrap {
          display: flex;
          flex-direction: column;
          margin-bottom: 5%;
          padding: 3rem;
          background-color: white;
        }
        .btn-wrap {
          margin-top: 1rem;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  );
};

export default InputKondate;