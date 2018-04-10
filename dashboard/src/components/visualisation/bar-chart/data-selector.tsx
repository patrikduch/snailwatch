import React, {PureComponent} from 'react';
import {Selection} from '../../../lib/measurement/selection/selection';
import {update, sort} from 'ramda';
import Button from 'reactstrap/lib/Button';
import {Measurement} from '../../../lib/measurement/measurement';
import MdDelete from 'react-icons/lib/md/delete';
import styled from 'styled-components';
import {Input} from 'reactstrap';
import MdAddCircleOutline from 'react-icons/lib/md/add-circle-outline';

interface Props
{
    measurements: Measurement[];
    measurementKeys: string[];
    selection: Selection | null;
    xAxis: string;
    yAxes: string[];
    onChangeXAxis(xAxis: string): void;
    onChangeYAxes(yAxes: string[]): void;
    onChangeSelection(selection: Selection): void;
}

const Row = styled.div`
  display: flex;
  align-items: center;
`;
const AddButton = styled(Button)`
  margin-top: 5px;
`;

export class DataSelector extends PureComponent<Props>
{
    render()
    {
        const keys = sort((a, b) => a.localeCompare(b), this.props.measurementKeys);

        return (
            <div>
                <div>X axis</div>
                {this.renderMeasurementKeys(keys, this.props.xAxis, this.props.onChangeXAxis)}
                <div>Y axes</div>
                {this.props.yAxes.map((axis, index) =>
                    <Row key={index}>
                        {this.renderMeasurementKeys(keys, axis, (val) => this.changeYAxis(index, val))}
                        <MdDelete size={26} onClick={() => this.removeYAxis(index)} />
                    </Row>
                )}
                <AddButton size='sm'
                           color='success'
                           title='Add axis'
                           onClick={this.addYAxis}>
                    <MdAddCircleOutline size={20} />
                </AddButton>
            </div>
        );
    }
    renderMeasurementKeys = (keys: string[], value: string, onChange: (value: string) => void): JSX.Element =>
    {
        return (
            <Input type='select'
                   bsSize='sm'
                   value={value}
                   onChange={e => onChange(e.currentTarget.value)}>
                <option key='' value='' />
                {keys.map(key =>
                    <option key={key} value={key}>{key}</option>
                )}
            </Input>
        );
    }

    changeYAxis = (index: number, value: string) =>
    {
        const axes = update(index, value, this.props.yAxes);
        this.props.onChangeYAxes(axes);
    }
    addYAxis = () =>
    {
        this.props.onChangeYAxes([...this.props.yAxes, '']);
    }
    removeYAxis = (index: number) =>
    {
        this.props.onChangeYAxes(this.props.yAxes.filter((axis, i) => i !== index));
    }
}
