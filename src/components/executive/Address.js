import React from 'react';
import { Button } from 'react-bootstrap';

const Address = () => {
    return (
        <div className='m-4 shadow-md shadow-orange-300 px-3 py-3'>
            <div className='flex items-center px-2'>
                <p className='font-bold text-gray-700 uppercase'>Name: {''}
                    <span className='font-normal normal-case'>Elena Pedroso Garcia</span>
                </p>
                <p className='font-bold text-gray-700 uppercase px-5'>Phone: {''}
                    <span className='font-normal normal-case'>5023037441 </span>
                </p>
            </div>
            <p className='font-bold text-gray-700 uppercase px-2'>Address: {''}
                <span className='font-normal normal-case'>
                    Continental Apto 16 % Jorge y Destrampes Cevillano
                </span>
            </p>
            <div className='flex items-center px-2'>
                <p className='font-bold text-gray-700 uppercase'>Province: {''}
                    <span className='font-normal normal-case'>La Habana</span>
                </p>
                <p className='font-bold text-gray-700 uppercase px-5'>Town: {''}
                    <span className='font-normal normal-case'>La Vivora</span>
                </p>
            </div>
            <p className='font-bold text-gray-700 uppercase px-2'>Ref: {''}
                <span className='font-normal normal-case'>Detras del la placita amarilla</span>
            </p>
            <div className='flex'>
                <Button
                    variant="outline-warning"
                    className="table-btn"
                    onClick={() => { }}
                    disabled={false}>
                    <i className="material-icons icon">edit_square</i>
                </Button>
                <Button
                    variant="outline-success"
                    onClick={() => { }}
                    disabled={false}
                    className="table-btn"
                >
                    <i className="material-icons icon">trolley</i>
                </Button>
            </div>
        </div>
    )
}

export default Address
