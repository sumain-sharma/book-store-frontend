export const customersActions=(allCustomers) =>({
    type:"All_Customers",
    payload: allCustomers,
});

export const editCustomerAction = (data) =>({
    type: "Edit_Customer",
    payload: data,
})

export const getCustomerAction = (id) =>({
    type: "Get_Customer",
    payload: id,
})