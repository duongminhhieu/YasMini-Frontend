import { Order } from "./Order";
import { Product } from "./Product";


export type TStatistic = {
    totalCategories: number;
    totalProducts: number;
    revenue: number;
    customerStatistic: CustomerStatistic;
    orderStatistic: OrderStatistic;
    topProducts: Product[];
    latestOrders: Order[];
}

export type CustomerStatistic = {
    totalCustomers: number;
    totalActiveCustomers: number;
    totalInactiveCustomers: number;
}

export type OrderStatistic = {
    totalOrders: number;
    pendingOrders: number;
    deliveringOrders: number;
    completedOrders: number;
    canceledOrders: number;
}

