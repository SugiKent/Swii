import React, {useEffect, useState} from 'react';
import { addMonths, format, eachMonthOfInterval} from 'date-fns'
import { useCollectionData } from "react-firebase-hooks/firestore";

import InputableTable from './InputableTable';
import { MonthlyData} from './../api/model';
import {fetchMonthlyData} from './../api/firebaseQuery';

const tableTypes = [
  {name: '支出', type: 'expense'},
  {name: '収入', type: 'income'},
  {name: '収支', type: 'incomeExpense'},
  {name: '投資額', type: 'invest'},
  {name: '月末総資産額', type: 'monthTotalAsset'},
  {name: '月末金融商品総資産額', type: 'monthTotalInvest'},
  { name: '月末現金預金額', type: 'monthDeposit' },
]

const Monthly: React.FC = () => {
  const [months, setMonths] = useState<Array<string>>([])
  const [monthlyData, loading, error] = useCollectionData<MonthlyData>(fetchMonthlyData(), { idField: "id" })

  useEffect(() => {
    // 前後12ヶ月分を表示する
    const now = new Date()
    const intervalMonths = eachMonthOfInterval({
      start: addMonths(now, - 12),
      end: addMonths(now, + 2)
    })
    setMonths(intervalMonths.map(m => format(m, 'yy-MM')))
  }, [])

  return (
    <>
      {error && <p>{error.message}</p>}
      {loading ? <p>読込中</p> : (
        <InputableTable collectionName="monthly" header={tableTypes} yaxis={months} data={monthlyData} />
      )}
    </>
  )
}

export default Monthly;
