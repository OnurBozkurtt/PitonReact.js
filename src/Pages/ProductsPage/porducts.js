import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './products.css';

import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import PaginatorRapor from './Pagionator';
import axios from 'axios';
import productFunc from '../../Services/ProductService/productFunc';
import productAuthService from '../../Services/ProductService/productAuthService';


export const Product = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const dt = useRef(null);

    const cols = [
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'Name' },
        { field: 'price', header: 'Price' },
        { field: 'image', header: 'Image' },
        { field: 'description', header: 'Description' },
        { field: 'timeStamp', header: 'TimeStamp' },
        { field: 'likes', header: 'Likes' }
    ];

    useEffect(() => {
        const successCallback = (e) => {
            setProducts(e);
        };

        const errorCallback = (evt) => { };
        productAuthService().productsAll(successCallback, errorCallback);
    }, []);
    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    }

    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, products);
                doc.save('productAll.pdf');
            })
        })
    }

    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(products);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'product_all');
        });
    }

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    }

    const onSelectionChange = (e) => {
        setSelectedProducts(e.value);
    }

    const header = (
        <div className="flex align-items-center export-buttons">
            <Button type="button" icon="pi pi-file" onClick={() => exportCSV(false)} className="mr-2" data-pr-tooltip="CSV" />
            <Button type="button" icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success mr-2" data-pr-tooltip="XLS" />
            <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
            <Button type="button" icon="pi pi-filter" onClick={() => exportCSV(true)} className="p-button-info ml-auto" data-pr-tooltip="Selection Only" />
        </div>
    );

    return (
        <div>
            <div className="card">
                <h5>Product List</h5>

                <Tooltip target=".export-buttons>button" position="bottom" />

                <DataTable ref={dt} value={products} header={header} dataKey="id" responsiveLayout="scroll"
                    selectionMode="multiple" selection={selectedProducts} onSelectionChange={onSelectionChange}>
                    {
                        cols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                    }
                </DataTable>
                <PaginatorRapor value={products} />
            </div>
        </div>
    );
}

export default Product