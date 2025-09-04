import { Loan } from "../../models/loanModel";

export async function updateOverdueLoans (finePerDay = 1) {
    const now = new Date();

    const loans = Loan.find({status: borrowed});

    for(let loan of loans){
        if(loan.dueDate < now){

            const overdueDays = Math.ceil((now - loan.dueDate) / (1000*60*60*24));
            loan.status = 'overdue';
            loan.fine = overdueDays * finePerDay;
            await loan.save();
        }
    }
    
}