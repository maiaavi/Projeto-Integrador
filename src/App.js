import React, {useState, useRef} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';


import './App.css';

const Table = () => {
    const toast = useRef(null);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [actionItemId, setActionItemId] = useState(undefined);
    const [nameEdit, setNameEdit] = useState(undefined);
    const [priceEdit, setPriceEdit] = useState(undefined);
    const [quantityEdit, setQuantityEdit] = useState(0);
    const [categoryEdit, setCategoryEdit] = useState(undefined);
    const [statusEdit, setStatusEdit] = useState(undefined);
    const [ratingEdit, setRatingEdit] = useState(undefined);


    const products = [
        {
          id: 1,
          name: "Salmão",
          price: "200",
          category: "Alimentos",
          quantity: "7",
          status: 'low',
          rating: "5",
        },
        {
          id: 2,
          name: "Arroz",
          price: "12",
          category: "Acompanhamentos",
          quantity: "23",
          status: 'in',
          rating: "2",
        },
        {
          id: 3,
          name: "Cream Cheese ",
          price: "14",
          category: "Acompanhamentos",
          quantity: "5",
          status: 'out',
          rating: "4",
        },
        {
          id: 4,
          name: "Vassoura",
          price: "5",
          category: "Itens de Limpeza",
          quantity: "10",
          status: 'out',
          rating: "4",
        },
        {
          id: 5,
          name: "Sabão",
          price: "14",
          category: "Itens de Limpeza",
          quantity: "20",
          status: 'in',
          rating: "5",
        },
        {
          id: 6,
          name: "Atum",
          price: "400",
          category: "Alimentos",
          quantity: "7",
          status: 'low',
          rating: "3",
        },
        {
          id: 7,
          name: "Molho Tarê",
          price: "34",
          category: "Condimentos",
          quantity: "15",
          status: 'out',
          rating: "4",
        },
        {
          id: 8,
          name: "Shoyu",
          price: "223",
          category: "Condimentos",
          quantity: "30",
          status: 'in',
          rating: "5",
        },
        {
          id: 9,
          name: "Saquê",
          price: "500",
          category: "Bebidas",
          quantity: "10",
          status: 'out',
          rating: "4",
        },
        {
          id: 10,
          name: "Água",
          price: "22",
          category: "Bebidas",
          quantity: "4",
          status: 'low',
          rating: "3",
        },
    ];
    const statusOptions = [
        { name: 'Em Estoque', code: 'in' },
        { name: 'Baixo Estoque', code: 'low' },
        { name: 'Fora de Estoque', code: 'out' },
    ];

    const [productsArray, setProductsArray] = useState(products);

    const header = () => {
        return (
            <div className="table-header">
                <Button onClick={() => setShowCreateDialog(true)} icon="pi pi-plus" label="Novo" severity="success" raised style={{ margin: '10px', marginRight: '20px' }} />
                <Button onClick={() =>  confirmDeleteItem("", true)} icon="pi pi-times" label="Excluir" severity="danger" raised style={{ margin: '10px' }} />
            </div>
        )
    }

    const actionsBody = (rowData) => {
        const statusObject = statusOptions[statusOptions.findIndex((status) => status.code === rowData.status)]
        return (
            <div className="actions" style={{}}>
                <Button 
                    icon="pi pi-pencil" 
                    rounded
                    severity="warning" 
                    aria-label="Editar" 
                    onClick={() => {
                        console.log(rowData);
                        setActionItemId(rowData.id)
                        setNameEdit(rowData.name)
                        setPriceEdit(rowData.price)
                        setCategoryEdit(rowData.category)
                        setStatusEdit(statusObject)
                        setQuantityEdit(rowData.quantity)
                        setRatingEdit(rowData.rating)
                        setShowEditDialog(true)
                    }}
                    style={{ marginRight: '10px' }}
                />
                <Button 
                    icon="pi pi-trash" 
                    rounded 
                    severity="danger" 
                    aria-label="Excluir" 
                    onClick={() => {
                        confirmDeleteItem(rowData.id, false)
                    }}
                />
            </div>
        )
    }

    const editItemAction = () => {
        const newProductsArray = [...productsArray];
        const index = newProductsArray.findIndex((item) => item.id === actionItemId);
        newProductsArray[index] = {
            id: actionItemId,
            name: nameEdit,
            price: priceEdit,
            category: categoryEdit,
            quantity: quantityEdit,
            status: statusEdit.code,
            rating: ratingEdit,
        };
        setProductsArray(newProductsArray)
        resetAndCloseEditDialog()
    }

    const createItemAction = () => {
        const newProductsArray = [...productsArray];
        const newProduct = {
            id: newProductsArray[newProductsArray.length - 1].id + 1,
            name: nameEdit,
            price: priceEdit,
            category: categoryEdit,
            quantity: quantityEdit,
            status: statusEdit.code,
            rating: ratingEdit,
        };

        newProductsArray.push(newProduct);
        setProductsArray(newProductsArray);
        resetAndCloseEditDialog()
    }

    const deleteItemAction = (itemId) => {
        const newProductsArray = [...productsArray];
        const index = newProductsArray.findIndex((item) => item.id === itemId);
        newProductsArray.splice(index, 1);
        setProductsArray(newProductsArray)
        resetAndCloseEditDialog()
    }

    const bulkDeleteItensAction = () => {
        const selectedProdcutIds = selectedProduct.map((item) => item.id)
        const newProductsArray = [...productsArray.filter((item) => !selectedProdcutIds.includes(item.id))];
        setProductsArray(newProductsArray)
        resetAndCloseEditDialog()
    }

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const resetAndCloseEditDialog = () => {
        setActionItemId(undefined);
        setNameEdit(undefined);
        setPriceEdit(undefined);
        setCategoryEdit(undefined);
        setStatusEdit(undefined);
        setQuantityEdit(0)
        setRatingEdit(undefined);
        setShowEditDialog(false);
        setShowCreateDialog(false);
    }

    const accept = (itemId, isBulk) => {
        isBulk ? bulkDeleteItensAction() : deleteItemAction(itemId)
        toast.current.show({ severity: 'success', summary: 'Ação Finalizada', detail: 'Os itens foram excluidos com sucesso', life: 3000 });

    }

    const reject = () => {
        resetAndCloseEditDialog()
        toast.current.show({ severity: 'warn', summary: 'Ação Cancelada', detail: 'Você cancelou a alção de deleção', life: 3000 });
    }

    const confirmDeleteItem = (itemId, isBulk = false) => {
        confirmDialog({
            message: isBulk ? 'Você irá excluir os itens selecionados' : 'Você irá excluir o item selecionado',
            header: 'Deseja seguir?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: () => accept(itemId, isBulk),
            reject: () => reject(),
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
        });
    };

    const getSeverity = (status) => {
        switch (status) {
            case 'Em Estoque':
                return 'success';
            case 'Baixo Estoque':
                return 'warning';
            case 'Fora de Estoque':
                return 'danger';
            default:
                return null;
        }
    };

    const statusBodyTemplate = (rowData) => {
        const statusObject = statusOptions[statusOptions.findIndex((status) => status.code === rowData.status)]
        console.log(statusObject);
        return <Tag value={statusObject ? statusObject.name : ""} severity={getSeverity(statusObject.name)} />;
    };



  return (
    <div className="table-wrapper" style={{ padding: '40px' }}>
        <h2 className="table-name">Produtos em Estoque</h2>
        <Toast ref={toast} />
        <ConfirmDialog />
        <Dialog header={showEditDialog ? "Altere as informações do produto" : "Preencha com as informações do novo produto"} visible={showEditDialog || showCreateDialog} style={{ width: '50vw' }} onHide={() => resetAndCloseEditDialog()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold' }} htmlFor="name">Nome</label>
                <InputText id="name" value={nameEdit} onChange={(e) => setNameEdit(e.target.value)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold' }} htmlFor="price">Preço</label>
                <InputNumber inputId="price" value={priceEdit} onValueChange={(e) => setPriceEdit(e.value)} mode="currency" currency="BRL" locale="pt-BR" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold' }} htmlFor="quantity">Quantidade</label>
                <InputNumber inputId="quantity" value={quantityEdit} onValueChange={(e) => setQuantityEdit(e.value)} mode="decimal" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold' }} htmlFor="category">Categoria</label>
                <InputText id="category" value={categoryEdit} onChange={(e) => setCategoryEdit(e.target.value)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold' }} htmlFor="category">Categoria</label>
                <Dropdown
                    value={statusEdit}
                    onChange={(e) => setStatusEdit(e.value)}
                    options={statusOptions}
                    optionLabel="name" 
                    className="w-full md:w-14rem"
                />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold' }} htmlFor="rating">Avaliação</label>
                <Rating id="rating" value={ratingEdit} onChange={(e) => setRatingEdit(e.value)} />
            </div>
            <div style={{ margin: '20px', justifyContent: 'center', display: 'flex' }}>
                <Button style={{ marginRight: '20px', marginLeft: '-10px' }} onClick={() => showEditDialog ? editItemAction() : createItemAction()} icon="pi pi-check" label={showEditDialog ? "Confirmar" : "Criar"} severity="success"></Button>
                <Button onClick={() => resetAndCloseEditDialog()} icon="pi pi-times" label="Cancelar" severity="danger"></Button>
            </div>
        </Dialog>
        <DataTable
            value={productsArray}
            responsiveLayout="scroll"
            size="small"
            showGridlines
            stripedRows
            header={header}
            removableSort
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks
            NextPageLink LastPageLink"
            rows={9}
            selection={selectedProduct}
            onSelectionChange={(e) => setSelectedProduct(e.value)}
            dataKey="id"
        >
            <Column headerStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} bodyStyle={{textAlign: 'center'}} selectionMode="multiple" field="selection" header=""></Column>
            <Column field="name" header="Nome" sortable></Column>
            <Column field="price" header="Preço" sortable></Column>
            <Column field="category" header="Categoria" sortable></Column>
            <Column field="quantity" header="Quantidade" sortable></Column>
            <Column field="status" sortable header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} />
            <Column field="rating" header="Avaliação" body={ratingBodyTemplate} sortable></Column>
            <Column field="actions" header="" body={actionsBody} bodyStyle={{textAlign: 'center'}}></Column>
        </DataTable>
    </div>
  );
};

export default Table;
