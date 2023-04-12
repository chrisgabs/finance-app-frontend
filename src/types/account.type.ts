export type accountType = {
    id: number,
    name: string,
    balance: number,
    key: number
}

export type recordType = {
    id: number,
    purpose: string,
    account_id: number,
    account_name?: string,
    amount: number,
    transaction_type: string,
    date_time: Date,
    key: number
}