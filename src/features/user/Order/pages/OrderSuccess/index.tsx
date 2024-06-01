import CreateOrderSuccessComponent from '../../components/CreateOrderSuccess';

function OrderSuccess({ orderNumber }: { orderNumber: string }) {
    return <CreateOrderSuccessComponent orderNumber={orderNumber} />;
}

export default OrderSuccess;
