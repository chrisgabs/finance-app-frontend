import { c as create_ssr_component, b as escape, a as subscribe, d as add_attribute, e as each, v as validate_component } from "../../chunks/index3.js";
import { w as writable } from "../../chunks/index2.js";
import "devalue";
import "postcss";
import "../../chunks/index.js";
const selectedRecord = writable({
  id: -1,
  transaction_type: "",
  purpose: "",
  account_name: "",
  amount: -1,
  date_time: /* @__PURE__ */ new Date(),
  key: 3,
  account_id: -1
});
const selectedAccount = writable({
  id: -1,
  name: "",
  balance: -1,
  key: -1
});
function createRecord() {
  const { subscribe: subscribe2, set, update } = writable([
    { id: 1, transaction_type: "Expense", purpose: "Trasnportation", account_name: "Unionbank", amount: 1e3, date_time: /* @__PURE__ */ new Date("2022-03-01"), key: 1, account_id: 2 },
    { id: 2, transaction_type: "Expense", purpose: "Food", account_name: "BPI", amount: 1e5, date_time: /* @__PURE__ */ new Date("2022-03-01"), key: 2, account_id: 1 },
    { id: 3, transaction_type: "Expense", purpose: "Communication", account_name: "Cash", amount: 2e3, date_time: /* @__PURE__ */ new Date("2022-03-01"), key: 3, account_id: 3 },
    { id: 4, transaction_type: "Expense", purpose: "Others", account_name: "bank", amount: 1234, date_time: /* @__PURE__ */ new Date("2022-03-01"), key: 4, account_id: 4 },
    { id: 5, transaction_type: "Expense", purpose: "Others", account_name: "bank", amount: 5, date_time: /* @__PURE__ */ new Date("2022-03-01"), key: 5, account_id: 5 },
    { id: 6, transaction_type: "Expense", purpose: "Others", account_name: "bank", amount: 2e3, date_time: /* @__PURE__ */ new Date("2022-03-01"), key: 6, account_id: 6 }
  ]);
  return {
    subscribe: subscribe2,
    // implement updateAccountName(), use same logic with edit()
    edit: (recordToEdit) => update((records2) => {
      for (let i = 0; i < records2.length; i++) {
        if (records2[i].id == recordToEdit.id) {
          let newRecord = {
            id: recordToEdit.id,
            account_name: recordToEdit.account_name,
            amount: recordToEdit.amount,
            date_time: recordToEdit.date_time,
            purpose: recordToEdit.purpose,
            transaction_type: recordToEdit.transaction_type,
            account_id: recordToEdit.account_id,
            key: generateUniqueKey()
          };
          records2[i] = newRecord;
          break;
        }
      }
      return records2;
    }),
    update,
    set
    // generateKeys: () => {
    //     update((records) => {
    //         for (let i = 0; i < records.length; i++) {
    //             records[i].key
    //         }
    //         return records
    //     })
    // }
  };
}
function createAccount() {
  const { subscribe: subscribe2, set, update } = writable([
    { id: 1, name: "Gcash", balance: 5e4, key: 1 },
    { id: 2, name: "Cash", balance: 8e5, key: 2 },
    { id: 3, name: "UnionBank", balance: 100, key: 3 },
    { id: 4, name: "BPI", balance: 0, key: 4 }
  ]);
  return {
    subscribe: subscribe2,
    edit: (newAccData) => update((accounts2) => {
      let nameChanged = false;
      for (let i = 0; i < accounts2.length; i++) {
        if (accounts2[i].id == newAccData.id) {
          if (accounts2[i].name !== newAccData.name)
            nameChanged = true;
          let newAccount = {
            id: newAccData.id,
            name: newAccData.name,
            balance: newAccData.balance,
            key: generateUniqueKey()
          };
          accounts2[i] = newAccount;
          break;
        }
      }
      if (nameChanged) {
        records.update((records2) => {
          for (let i = 0; i < records2.length; i++)
            if (records2[i].account_id === newAccData.id) {
              records2[i].account_name = newAccData.name;
              records2[i].key = generateUniqueKey();
            }
          return records2;
        });
      }
      return accounts2;
    }),
    update,
    set
  };
}
const generateUniqueKey = () => {
  return Math.random() * 1e8;
};
const records = createRecord();
const accounts = createAccount();
const RecordRow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { record } = $$props;
  const { id, purpose, account_name, amount, date_time } = record;
  if ($$props.record === void 0 && $$bindings.record && record !== void 0)
    $$bindings.record(record);
  return `<tr class="hover"><th>${escape(id)}</th>
    <td>${escape(purpose)}</td>
    <td>${escape(account_name)}</td>
    <td>${escape(amount)}</td></tr>`;
});
const CreateRecordModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_records;
  let $accounts, $$unsubscribe_accounts;
  $$unsubscribe_records = subscribe(records, (value) => value);
  $$unsubscribe_accounts = subscribe(accounts, (value) => $accounts = value);
  let createRecordModalCheckbox;
  let tabs = ["Income", "Expense", "Transfer"];
  let activeTab = 1;
  let loading = false;
  let types = ["Food", "Transportation", "Other"];
  $$unsubscribe_records();
  $$unsubscribe_accounts();
  return `<input type="checkbox" id="create-record-modal" class="modal-toggle"${add_attribute("this", createRecordModalCheckbox, 0)}>

<label class="modal z-40" for="create-record-modal"><label class="modal-box flex flex-col gap-4 items-center" for=""><h3 class="font-bold text-lg">Add Financial Record</h3>

        <form action="?/createRecord" class="input-container flex flex-col gap-2"><div class="tabs tabs-boxed justify-center">${each(tabs, (tab, index) => {
    return `<button ${""} type="button" class="${["tab tab-active", activeTab == index && !loading ? "tab-active" : ""].join(" ").trim()}">${escape(tab)}</button>`;
  })}</div>

            <select ${""} name="account" class="select select-bordered w-full max-w-xs"><option disabled selected value="Account">Account</option>${each($accounts, (acc) => {
    return `<option${add_attribute("value", acc.name, 0)}>${escape(acc.name)}</option>`;
  })}</select>
            
            <input ${""} type="text" name="amount" placeholder="Amount" class="input input-bordered w-full max-w-xs">

            <select ${""} name="purpose" class="select select-bordered w-full max-w-xs"><option disabled selected value="Purpose">Purpose</option>${each(types, (type) => {
    return `<option${add_attribute("value", type, 0)}>${escape(type)}</option>`;
  })}</select>

            <textarea ${""} name="note" class="textarea textarea-bordered" placeholder="Note"></textarea>

            <div class="modal-action my-0 mt-3 justify-center"><button type="button" class="btn btn-error">Cancel</button>
                <button ${""} class="btn btn-primary">Add Record</button></div></form></label></label>`;
});
const CreateAccountModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $accounts, $$unsubscribe_accounts;
  $$unsubscribe_accounts = subscribe(accounts, (value) => $accounts = value);
  let createAccountCheckbox;
  let accountNames = [];
  $accounts.forEach((element) => {
    accountNames.push(element.name);
  });
  $$unsubscribe_accounts();
  return `

<input type="checkbox" id="create-account-modal" class="modal-toggle"${add_attribute("this", createAccountCheckbox, 0)}>

<label class="modal z-40" for="create-account-modal"><label class="modal-box flex flex-col gap-4 items-center" for=""><h3 class="font-bold text-lg">Create Financial Account</h3>

        <form action="?/createAccount" class="input-container flex flex-col gap-2"><input ${""} type="text" name="name" id="name" placeholder="Account Name" class="input input-bordered w-full max-w-xs">
            <input ${""} type="text" name="balance" id="balance" placeholder="Starting Balance" class="input input-bordered w-full max-w-xs">

            <div class="modal-action my-0 mt-3 justify-center"><button type="button" class="btn btn-error">Cancel</button>
                <button ${""} class="btn btn-primary">Add Account</button></div></form></label></label>`;
});
const AccountStat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { account } = $$props;
  const { name, balance } = account;
  if ($$props.account === void 0 && $$bindings.account && account !== void 0)
    $$bindings.account(account);
  return `
<div class="stat basis-48 truncate flex-none bg-sky-100"><div class="stat-title">${escape(name)}</div>
    <div class="stat-value overflow-clip text-xl">${escape(balance.toLocaleString("en-US"))}</div></div>`;
});
const EditRecordModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_selectedRecord;
  let $accounts, $$unsubscribe_accounts;
  $$unsubscribe_selectedRecord = subscribe(selectedRecord, (value) => value);
  $$unsubscribe_accounts = subscribe(accounts, (value) => $accounts = value);
  let editRecordModalCheckbox;
  let accountsComboBox;
  let purposeComboBox;
  let record_amount;
  let loading = false;
  let tabs = ["Income", "Expense", "Transfer"];
  let activeTab = 1;
  let types = ["Food", "Transportation", "Other"];
  $$unsubscribe_selectedRecord();
  $$unsubscribe_accounts();
  return `<input type="checkbox" id="edit-record-modal" class="modal-toggle"${add_attribute("this", editRecordModalCheckbox, 0)}>

<label class="modal z-40" for="edit-record-modal"><label class="modal-box flex flex-col gap-4 items-center" for=""><h3 class="font-bold text-lg">Edit Financial Record</h3>

        <form action="?/editRecord" class="input-container flex flex-col gap-2"><div class="tabs tabs-boxed justify-center">${each(tabs, (tab, index) => {
    return `<button ${""} type="button" class="${["tab tab-active", activeTab == index && !loading ? "tab-active" : ""].join(" ").trim()}">${escape(tab)}</button>`;
  })}</div>

            <select ${""} name="account" class="select select-bordered w-full max-w-xs"${add_attribute("this", accountsComboBox, 0)}><option disabled selected value="Account">Account</option>${each($accounts, (acc) => {
    return `<option${add_attribute("value", acc.name, 0)}>${escape(acc.name)}</option>`;
  })}</select>
            
            <input ${""} type="text" name="amount" placeholder="Amount" class="input input-bordered w-full max-w-xs"${add_attribute("value", record_amount, 0)}>

            <select ${""} name="purpose" class="select select-bordered w-full max-w-xs"${add_attribute("this", purposeComboBox, 0)}><option disabled selected value="Purpose">Purpose</option>${each(types, (type) => {
    return `<option${add_attribute("value", type, 0)}>${escape(type)}</option>`;
  })}</select>

            <textarea ${""} name="note" class="textarea textarea-bordered" placeholder="Note">${""}</textarea>

            <div class="flex-col modal-action my-0 mt-3 justify-center"><div class="flex justify-center gap-2"><button type="button" class="btn btn-error">Cancel</button>
                    <button ${""} class="btn btn-primary">Update Record</button></div>
                <button formaction="?/deleteRecord" ${""} class="btn-link text-accent w-fit self-center text-sm mt-1">Detele Record</button></div></form></label></label>`;
});
const EditAccountModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedAccount, $$unsubscribe_selectedAccount;
  $$unsubscribe_selectedAccount = subscribe(selectedAccount, (value) => $selectedAccount = value);
  let editAccountCheckbox;
  $$unsubscribe_selectedAccount();
  return `<input type="checkbox" id="edit-account-modal" class="modal-toggle"${add_attribute("this", editAccountCheckbox, 0)}>

<label class="modal z-40" for="edit-account-modal"><label class="modal-box flex flex-col gap-4 items-center" for=""><h3 class="font-bold text-lg">Edit Financial Account</h3>

        <form action="?/editAccount" class="input-container flex flex-col gap-2"><input ${""} type="text" name="newName" id="edit-account-name" placeholder="Account Name" class="input input-bordered w-full max-w-xs"${add_attribute("value", $selectedAccount.name, 0)}>
            <input ${""} type="text" name="balance" id="edit-account-balance" placeholder="Starting Balance" class="input input-bordered w-full max-w-xs"${add_attribute("value", $selectedAccount.balance, 0)}>

            <div class="flex-col modal-action my-0 mt-3 justify-center"><div class="flex justify-center gap-2"><button type="button" class="btn btn-error">Cancel</button>
                  <button ${""} class="btn btn-primary">Edit Account</button></div>
                <button formaction="?/deleteAccount" ${""} class="btn-link text-accent w-fit self-center text-sm mt-1">Detele Record</button></div></form></label></label>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $accounts, $$unsubscribe_accounts;
  let $records, $$unsubscribe_records;
  $$unsubscribe_accounts = subscribe(accounts, (value) => $accounts = value);
  $$unsubscribe_records = subscribe(records, (value) => $records = value);
  let { data } = $$props;
  let totalBalance;
  console.log("page.svelte |", data.session?.user.email);
  console.log($records);
  if (data.session) {
    records.set(data.records);
    accounts.set(data.accounts);
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    {
      totalBalance = $accounts.reduce((a, b) => a + b.balance, 0);
    }
  }
  $$unsubscribe_accounts();
  $$unsubscribe_records();
  return `

${validate_component(EditRecordModal, "EditRecordModal").$$render($$result, {}, {}, {})}
${validate_component(EditAccountModal, "EditAccountModal").$$render($$result, {}, {}, {})}
${validate_component(CreateRecordModal, "NewRecordModal").$$render($$result, {}, {}, {})}
${validate_component(CreateAccountModal, "NewAccountModal").$$render($$result, {}, {}, {})}


<div class="flex-col max-w-[600px] mx-5 sm:mx-auto space-y-4"><div class="navbar bg-base-100 mt-4 rounded-box outline outline-1"><div class="flex-none"><button class="btn btn-square btn-ghost"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div>
        <div class="flex-1">${data.session ? `<a href="/" class="btn btn-ghost normal-case text-xl">Hello, ${escape(data.session.user.user_metadata.first_name)}</a>` : `<a href="/" class="btn btn-ghost normal-case text-xl">Finance-App</a>`}</div>
        <form class="navbar-end"><button formaction="?/logout" class="btn hover:bg-accent hover:outline-0">Logout</button></form></div>
    
    

    <div class="rounded-box outline outline-1 flex justify-start overflow-x-auto p-1 no-scrollbar gap-1">
        <div class="stat basis-48 truncate flex-none bg-sky-100 rounded-bl-xl rounded-tl-xl"><div class="stat-title">TOTAL</div>
            <div class="stat-value overflow-clip text-base">${escape(totalBalance.toLocaleString("en-US"))}</div></div>
        ${each($accounts, (account) => {
    return `${validate_component(AccountStat, "AccountStat").$$render($$result, { account }, {}, {})}`;
  })}
        <div class="stat items-center flex-none basis-16"><label for="create-account-modal" class="btn btn-outline shadow">+</label></div></div>

    

    <div class="flex justify-between items-center mx-2"><span class="ml-2 text-xl font-semibold">Records</span>
        <label for="create-record-modal" class="btn btn-md btn-primary">add</label></div>

    
    

    <table class="table w-full outline outline-1 rounded-lg m-0 p-0">
        <thead><tr><th></th>
            <th>Type</th>
            <th>Account</th>
            <th>Amount</th></tr></thead>
        <tbody>${each($records, (record) => {
    return `${validate_component(RecordRow, "RecordRow").$$render($$result, { record }, {}, {})}`;
  })}</tbody></table>

    

    

    
    

    

    

    </div>
`;
});
export {
  Page as default
};
