import { Button, Pagination, Table, TableProps, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import {
    useChangeStatusUserMutation,
    useGetListUserQuery,
} from '../../../../../lib/redux/manageUser/manageUserApiSlice';
import { PaginationParams } from '../../../../../types/Pagination';
import { User } from '../../../../../types/User';
import APIResponse from '../../../../../types/APIResponse';
import { SwapOutlined } from '@ant-design/icons';

type ColumnsType<T> = TableProps<T>['columns'];

function ManageUserTable() {
    // Columns
    const columns: ColumnsType<User> = [
        {
            title: 'User(s)',
            dataIndex: 'firstName',
            className: 'text-blue-500',
            render(_, user) {
                return (
                    <div>
                        <div className="flex flex-col ml-2">
                            <a target="_blank" rel="noopener noreferrer">
                                {(user.firstName && user.lastName && (
                                    <div>
                                        {user.firstName} {user.lastName}
                                    </div>
                                )) || <div>{user.email}</div>}
                            </a>

                            <span className="text-gray-400 text-sm  ">
                                Email: {user.email}
                            </span>
                            {user.isActive ? (
                                <span className="">
                                    <Tag color="green" className="text-xs">
                                        Active
                                    </Tag>
                                </span>
                            ) : (
                                <span className="">
                                    <Tag color="red" className="text-xs">
                                        InActive
                                    </Tag>
                                </span>
                            )}
                        </div>
                    </div>
                );
            },
        },

        {
            title: 'Role',
            dataIndex: 'role',
            render: (_, user) => {
                return user.roles.map((role) => (
                    <Tag
                        key={role.name}
                        color={role.name === 'ADMIN' ? 'orange' : 'blue'}
                        className="text-xs"
                    >
                        {role.name}
                    </Tag>
                ));
            },
        },
        {
            title: 'Permission',
            dataIndex: 'role',
            render: (_, user) => {
                return user.roles.map((role) =>
                    role.permissions.map((permission) => (
                        <Tag key={permission} color="green" className="text-xs">
                            {permission}
                        </Tag>
                    )),
                );
            },
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            render: (date: string) =>
                new Date(date).toLocaleString('en-US', {
                    timeZone: 'Asia/Ho_Chi_Minh',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }),
        },
        {
            title: 'Last Modified Date',
            dataIndex: 'lastModifiedDate',
            render: (date: string) =>
                new Date(date).toLocaleString('en-US', {
                    timeZone: 'Asia/Ho_Chi_Minh',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }),
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            fixed: 'right',
            render: (_, user) => {
                // Check if the user is not an admin
                if (!user.roles.some((role) => role.name === 'ADMIN')) {
                    return (
                        <Button
                            className="cursor-pointer text-blue-500 hover:text-blue-400 flex justify-center items-center"
                            onClick={async () => {
                                await toggleActiveUser({ id: user.id });
                            }}
                            loading={statusActiveUser.isLoading}
                            icon={<SwapOutlined />}
                        >
                            Change Status
                        </Button>
                    );
                }
                // If the user is an admin, return null or some other component
                return null;
            },
        },
    ];

    // State
    const [options, setOptions] = useState<PaginationParams>({
        current: 1,
        pageSize: 10,
        total: 10,
    });

    // Query
    const {
        currentData: listUser,
        isLoading: listUserLoading,
        refetch: refetchUser,
    } = useGetListUserQuery(options);

    const [toggleActiveUser, statusActiveUser] = useChangeStatusUserMutation();

    useEffect(() => {
        if (statusActiveUser.isSuccess) {
            message.success('Change status successfully');
            refetchUser();
        }

        if (statusActiveUser.isError) {
            const error = statusActiveUser.error as APIResponse;
            message.error(error.message);
        }
    }, [statusActiveUser]);

    // handlers

    return (
        <>
            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={listUser?.result?.data}
                loading={listUserLoading}
                pagination={false}
            />

            <Pagination
                className="flex justify-end my-4 mr-4"
                current={options.current}
                pageSize={options.pageSize}
                total={listUser?.result?.total || 10}
                onChange={(page, pageSize) => {
                    setOptions({
                        ...options,
                        current: page,
                        pageSize,
                    });
                }}
                showQuickJumper
                showSizeChanger
                showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                }
            />
        </>
    );
}

export default ManageUserTable;
