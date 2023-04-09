import { e as error, r as redirect } from "../../chunks/index.js";
import "../../chunks/supabaseClient.js";
async function updateAccountOnCreate(db, account_id, amount, transaction_type) {
  if (transaction_type == "Income") {
    await db.rpc("increment_balance", { acc_id: account_id, amount });
  } else if (transaction_type == "Expense") {
    await db.rpc("decrement_balance", { acc_id: account_id, amount });
  }
}
async function updateAccountOnDelete(db, account_id, amount, transaction_type) {
  console.log("updateAccountOnDelete SERVER called");
  if (transaction_type == "Expense") {
    await db.rpc("increment_balance", { acc_id: account_id, amount });
  } else if (transaction_type == "Income") {
    await db.rpc("decrement_balance", { acc_id: account_id, amount });
  }
}
const load = async ({ locals }) => {
  console.log("page.server |", locals.session?.user.email);
  if (!locals.session) {
    return {
      accounts: [],
      records: []
    };
  }
  const receivedData = await locals.sb.from("fin_accounts").select("id, name, balance");
  const receivedRecords = await locals.sb.from("fin_records").select("id, purpose, amount, account_id, date_time, transaction_type").order("date_time", { ascending: false });
  if (receivedData.error) {
    console.log("error");
    console.log(receivedData.error);
  } else if (receivedRecords.error) {
    console.log(receivedRecords.error);
  }
  let records2 = [];
  let recordsData = receivedRecords.data;
  let accounts2 = [];
  let accountsData = receivedData.data;
  for (let i = 0; i < recordsData.length; i++) {
    const { id, purpose, amount, account_id, date_time, transaction_type } = recordsData[i];
    const account_name = accountsData.find((record) => record.id == account_id)?.name;
    records2.push({
      id,
      purpose,
      amount,
      account_id,
      date_time,
      transaction_type,
      key: id,
      account_name
    });
  }
  for (let i = 0; i < accountsData.length; i++) {
    const { id, name, balance } = accountsData[i];
    accounts2.push({
      id,
      name,
      balance,
      key: id
    });
  }
  return {
    accounts: accounts2,
    records: records2
  };
};
const actions = {
  login: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const email = body.email;
    const password = body.password;
    const { data, error: err } = await locals.sb.auth.signInWithPassword({
      email,
      password
    });
    if (err) {
      console.log(err);
      return error(500, {
        message: "Error boi"
      });
    }
    console.log("login end");
  },
  logout: async ({ request, locals }) => {
    console.log("logout");
    const { error: error2 } = await locals.sb.auth.signOut();
    console.log(error2);
    if (error2) {
      console.log("error opccured");
      throw invalid(500, { message: "Something went wrong logging you out." });
    }
    throw redirect(300, "/login");
  },
  register: async ({ request, locals }) => {
    console.log("register started");
    const data = await request.formData();
    const email = data.get("email").toString();
    const first_name = email.split("@")[0];
    locals.sb.auth.signUp({
      email,
      password: data.get("password").toString(),
      options: {
        data: {
          first_name,
          last_name: "deeznuts"
        }
      }
    }).then(async (response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
    console.log("register end");
    throw redirect(303, "/");
  },
  createAccount: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const name = body.name;
    const balance = body.balance;
    console.log(name, balance);
    const { data, error: error2 } = await locals.sb.from("fin_accounts").insert({
      name,
      balance,
      owner: locals.session?.user.id
    }).select("id, name, balance").limit(1).single();
    if (error2) {
      return invalid(400, { message: error2 });
    }
    if (data) {
      return { data };
    }
  },
  createRecord: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const purpose = body.purpose;
    const account = body.account;
    const amount = body.amount;
    const note = body.note;
    const transaction_type = body.transaction_type;
    const { data, error: error2 } = await locals.sb.from("fin_records").insert({
      purpose,
      transaction_type,
      amount,
      date_time: /* @__PURE__ */ new Date(),
      account_id: account,
      description: note,
      owner: locals.session?.user.id
    }).select("id, purpose, transaction_type, amount, account_id, date_time").limit(1).single();
    await updateAccountOnCreate(locals.sb, parseInt(account), parseInt(amount), transaction_type);
    if (error2) {
      return invalid(400, { message: error2 });
    }
    if (data) {
      const { id, purpose: purpose2, transaction_type: transaction_type2, amount: amount2, account_id, date_time } = data;
      let createdRecord = {
        id,
        purpose: purpose2,
        transaction_type: transaction_type2,
        amount: amount2,
        account_id,
        date_time,
        key: id
      };
      return { data: createdRecord };
    }
  },
  deleteRecord: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const id = body.id;
    const account = body.account;
    const amount = body.amount;
    const transaction_type = body.transaction_type;
    console.log(account, amount, transaction_type);
    const { data, error: error2 } = await locals.sb.from("fin_records").delete().eq("id", id);
    if (error2) {
      return invalid(400, { message: error2 });
    }
    await updateAccountOnDelete(locals.sb, parseInt(account), parseInt(amount), transaction_type);
    if (data) {
      return { data };
    }
  },
  editRecord: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const id = body.id;
    const purpose = body.purpose;
    const account = body.account;
    const amount = body.amount;
    const note = body.note;
    const transaction_type = body.transaction_type;
    const { data, error: error2 } = await locals.sb.from("fin_records").update({
      amount,
      account_id: account,
      description: note,
      transaction_type,
      purpose
    }).eq("id", id).select("id, purpose, transaction_type, amount, account_id, date_time").single();
    if (error2) {
      return invalid(400, { message: error2 });
    }
    if (data) {
      return { data };
    }
  },
  deleteAccount: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const name = body.name;
    const { data, error: error2 } = await locals.sb.from("fin_accounts").delete().eq("name", name);
    if (error2) {
      return invalid(400, { message: error2 });
    }
    if (data) {
      return { data };
    }
  },
  editAccount: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const name = body.name;
    const newName = body.newName;
    const balance = body.balance;
    console.log(name);
    console.log(newName);
    console.log(balance);
    const { data, error: error2 } = await locals.sb.from("fin_accounts").update({
      name: newName,
      balance
    }).eq("name", name).select("name, balance, id").single();
    if (error2) {
      return invalid(400, { message: error2 });
    }
    if (data) {
      return { data };
    }
  }
};
export {
  actions,
  load
};
