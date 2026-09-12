export type Status="On Track"|"At Risk"|"Delayed"|"Critical"; export type Project={id:string;name:string;category:string;district:string;budget:number;utilized:number;progress:number;status:Status;planned:number;actual:number;stale:number;beneficiaries:number;lat:number;lng:number};
const rows=[
["MP-2026-001","Smart Digital Classroom Initiative","Education","Panipat",4000000,3100000,85,"On Track",180,168,3,820,29.3909,76.9635],
["MP-2026-002","Rural Healthcare Infrastructure","Healthcare","Karnal",12000000,6800000,42,"At Risk",240,221,8,4200,29.6857,76.9905],
["MP-2026-003","Village Water Supply Project","Water Supply","Rohtak",7500000,6075000,28,"Delayed",210,362,21,6100,28.8955,76.6066],
["MP-2026-004","Solar Street Lighting Phase II","Energy","Sonipat",5600000,3900000,69,"On Track",160,151,4,3500,28.9931,77.0151],
["MP-2026-005","Community Skill Development Hub","Skill Development","Hisar",9200000,7100000,63,"At Risk",220,236,12,1800,29.1492,75.7217],
["MP-2026-006","Government School Sanitation Upgrade","Sanitation","Jind",3300000,2500000,74,"On Track",140,137,5,2400,29.3162,76.3145],
["MP-2026-007","Primary Health Centre Renovation","Healthcare","Ambala",8400000,7056000,51,"At Risk",190,201,10,5100,30.3782,76.7767],
["MP-2026-008","Village Link Road Improvement","Roads","Kurukshetra",15000000,12150000,57,"At Risk",300,326,15,7400,29.9695,76.8783],
["MP-2026-009","Rainwater Harvesting Network","Water Supply","Yamunanagar",6800000,4200000,61,"On Track",180,171,6,3200,30.129,77.2674],
["MP-2026-010","Public Library Digitisation","Education","Panipat",4700000,3290000,58,"On Track",150,146,4,1900,29.3909,76.9635],
["MP-2026-011","Women Enterprise Centre","Livelihoods","Karnal",7800000,6474000,46,"At Risk",210,228,14,1250,29.6857,76.9905],
["MP-2026-012","Community Sports Complex","Sports","Rohtak",11000000,9350000,72,"On Track",240,229,3,4600,28.8955,76.6066],
["MP-2026-013","Accessible Bus Shelter Cluster","Transport","Sonipat",5200000,4420000,38,"Delayed",180,248,18,2800,28.9931,77.0151],
["MP-2026-014","Flood Drainage Resilience Works","Drainage","Hisar",13500000,8370000,49,"At Risk",270,281,11,9200,29.1492,75.7217],
["MP-2026-015","Digital Citizen Service Kiosk","Governance","Jind",2900000,2610000,88,"On Track",120,116,2,6700,29.3162,76.3145],
["MP-2026-016","Village Solar Pump Programme","Energy","Ambala",9900000,8811000,77,"On Track",210,203,4,3800,30.3782,76.7767],
["MP-2026-017","Anganwadi Modernisation Drive","Child Development","Kurukshetra",6100000,5124000,67,"On Track",190,185,5,2100,29.9695,76.8783],
["MP-2026-018","Rural Market Shed Construction","Livelihoods","Yamunanagar",7300000,6351000,31,"Critical",180,270,26,1500,30.129,77.2674],
["MP-2026-019","Village Community Hall","Community","Panipat",6500000,5265000,64,"On Track",200,196,5,3100,29.2825,76.9294],
["MP-2026-020","Clean Drinking Water ATMs","Water Supply","Karnal",5800000,4872000,53,"At Risk",170,188,9,5200,29.879,77.0587]] as const;
export const projects:Project[]=rows.map(r=>({id:r[0],name:r[1],category:r[2],district:r[3],budget:r[4],utilized:r[5],progress:r[6],status:r[7],planned:r[8],actual:r[9],stale:r[10],beneficiaries:r[11],lat:r[12],lng:r[13]}));
export const totals={allocated:projects.reduce((s,p)=>s+p.budget,0),utilized:projects.reduce((s,p)=>s+p.utilized,0),beneficiaries:projects.reduce((s,p)=>s+p.beneficiaries,0)};