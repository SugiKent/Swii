import React from 'react';
import { Table, Form } from 'react-bootstrap';

import { MonthlyData } from './../api/model';
import {  updateDataByYidAndLabel } from './../api/firebaseQuery';

type Props = {
  collectionName: string;
  header: Array<{type: string, name: string}>;
  yaxis: Array<string>;
  data: Array<MonthlyData> | undefined
}

const InputableTable: React.FC<Props> = ({
  collectionName,
  header,
  yaxis,
  data
}) => {
  const onBlurHandler = (value: string, id: string, type: string) => {
    const data = {
      [type]: value,
    }
    updateDataByYidAndLabel(collectionName, id, data);
  }

  return (
    <Table bordered hover responsive size="sm">
      <thead>
        <tr>
          <th>#</th>
          {header.map(t => (
            <td key={t.type}>{t.name}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {yaxis.map((yId: string) => {
          const monthData = data?.filter(d => d && d.id === yId)[0]
          return (
            <tr key={yId}>
              <td style={{minWidth: 70}}>{yId}</td>
              {header.map(label => {
                const value = monthData ? monthData[label.type.toString()] : null
                return (
                  <td key={yId + label.type} style={{ minWidth: 100 }}>
                    <Form.Control defaultValue={value ? value : ''} onBlur={(e: React.FocusEvent<HTMLInputElement>) => onBlurHandler(e.target.value, yId, label.type)} size="sm" type="tel" style={{textAlign: 'right'}} />
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default InputableTable;
