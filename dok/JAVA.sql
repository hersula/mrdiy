DELETE FROM rpt_sales_java;
INSERT INTO rpt_sales_java(deskripsi, today, lw, plw, mtd, lm, plm, ly, ply, tanggal, urut)
/*MALL*/
select DISTINCT deskripsi, sum(today) as today, sum(lw) as lw, (sum(today)/sum(lw)) as plw,
sum(mtd) as mtd, (sum(lm)) as lm, (sum(mtd) / sum(lm)) as plm,
sum(ly) as ly, (sum(mtd) / sum(ly)) as ply, to_date('20211006', 'YYYYMMDD') as tanggal, urut from (

/*NET SALES
today */
select 'Net Sales' as deskripsi, sum(a.net) as today, 0 as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut
from vnet a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate = '10/06/2021'
UNION ALL
select 'Net Sales' as deskripsi, sum(a.amt) as today, 0 as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut  from gross a
where a.sales_closedate = '10/06/2021'
UNION ALL
/*lw*/
select 'Net Sales' as deskripsi, 0 as today, sum(a.net) as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut from vnet a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate = '09/29/2021'
UNION ALL
select 'Net Sales' as deskripsi, 0 as today, sum(a.amt) as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut from gross a
where a.sales_closedate = '09/29/2021'
UNION ALL
/*mtd*/
select 'Net Sales' as deskripsi, 0 as today, 0 as lw, 0 as plw, sum(a.net) as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut from vnet a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate between '10/01/2021' and '10/05/2021'
UNION ALL
select 'Net Sales' as deskripsi, 0 as today, 0 as lw, 0 as plw, sum(amt) as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut
from gross a
where a.sales_closedate BETWEEN '10/01/2021' and '10/06/2021'
UNION ALL
/*LM*/
select 'Net Sales' as deskripsi, 0 as today, 0 as lw, 0 as plw, 0 as mtd,
sum(net) as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut
from vnet a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_store in (select sales_store from vnet n
left join m_customer m on m.m_code = n.sales_store
where m.m_island = 'JAVA' and  n.sales_closedate
between '09/01/2020' and '09/06/2020') and a.sales_closedate between '09/01/2021' and '09/06/2021'
UNION ALL
select 'Net Sales' as deskripsi, 0 as today, 0 as lw, 0 as plw, 0 as mtd,
sum(a.amt) as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut
from gross a
where a.sales_closedate between '09/01/2021' and '09/06/2021'
UNION ALL
/*LY*/
select 'Net Sales' as deskripsi, 0 as today, 0 as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, sum(a.net) as ly, 0 as ply, 'A' as urut
from vnet a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate BETWEEN '10/01/2020' and '10/06/2020'
UNION ALL
select 'Net Sales' as deskripsi, 0 as today, 0 as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, sum(a.amt) as ly, 0 as ply, 'A' as urut
from gross a
where a.sales_closedate between '10/01/2020' and '10/06/2020'
UNION ALL
/*NET SALES/DAY/STORE
TODAY*/
select 'Net sales/day/store' as deskripsi, sum(a.net)/189 as today, 0 as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from vnet a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate = '10/06/2021'
UNION ALL
select 'Net sales/day/store' as deskripsi, sum(a.amt)/4 as today, 0 as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from gross a
where a.sales_closedate = '10/06/2021'
UNION ALL
/*LW*/
select 'Net sales/day/store' as deskripsi, 0 as today, sum(a.net)/189 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from vnet a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate = '09/29/2021'
UNION ALL
select 'Net sales/day/store' as deskripsi, 0 as today, sum(a.amt)/189 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from gross a
where a.sales_closedate = '09/29/2021'
UNION ALL
/*MTD*/
select 'Net sales/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
(sum(a.net)/6)/189 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from vnet a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate between '10/01/2021'
and '10/06/2021'
UNION ALL
select 'Net sales/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw, (sum(a.amt)/6)/189 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from gross a
where a.sales_closedate BETWEEN '10/01/2021' and '10/06/2021'
UNION ALL
/*LM*/
select 'Net sales/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, (sum(a.net)/30)/189 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from vnet a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate between '09/06/2021'
and '10/05/2021'
UNION ALL
select 'Net sales/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw, 0 as mtd,
(sum(a.amt)/30)/189 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from gross a
where a.sales_closedate BETWEEN '09/06/2021' and '10/05/2021'
UNION ALL
/*LY*/
select 'Net sales/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, (sum(a.net)/6)/295 as ly, 0 as ply, 'B' as urut
from vnet a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate between '10/01/2020' and '10/06/2020'
UNION ALL
select 'Net sales/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, (sum(a.amt)/6)/295 as ly, 0 as ply, 'B' as urut
from gross a
where a.sales_closedate between '10/01/2020' and '10/06/2020'
UNION ALL
/*AVG TRANSACTION
AVG TRX*/
select 'AVG Transaction/day/store' as deskripsi, avg(a.trx) as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'C' as urut from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate = '10/06/2021'
UNION ALL
/*AVG LW*/
select 'AVG Transaction/day/store' as deskripsi, 0 as today, avg(a.trx) as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'C' as urut from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate = '09/29/2021'
UNION ALL
/*AVG MTD*/
select 'AVG Transaction/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
avg(a.trx) as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'C' as urut from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_store in (select sales_store from sales_daily n
left join m_customer m on m.m_code = n.sales_store
where m.m_island = 'JAVA' and a.sales_closedate
between '10/01/2020' and '10/05/2020') and a.sales_closedate between '10/01/2021'
and '10/05/2021'
UNION ALL
/*AVG LM*/
select 'AVG Transaction/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, avg(a.trx) as lm, 0 as plm, 0 as ly, 0 as ply, 'C' as urut from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate between '09/01/2021' and '09/06/2021'
UNION ALL
/*AVG LY*/
select 'AVG Transaction/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, avg(a.trx) as ly, 0 as ply, 'C' as urut
from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate between '10/01/2020' and '10/06/2020'
UNION ALL
/* AVG TRANSACTION VALUE
AVG TRX*/
select 'AVG Transaction value' as deskripsi, sum(a.trx) as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'D' as urut from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate = '10/06/2021'
UNION ALL
/*AVG LW*/
select 'AVG Transaction value' as deskripsi, 0 as today, sum(a.trx) as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'D' as urut from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate = '09/29/2021'
UNION ALL
/*AVG MTD*/
select 'AVG Transaction value' as deskripsi, 0 as today, 0 as lw, 0 as plw,
sum(a.trx) as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'D' as urut from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate between '10/01/2021'
and '10/05/2021'
UNION ALL
/*AVG LM*/
select 'AVG Transaction value' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, sum(a.trx) as lm, 0 as plm, 0 as ly, 0 as ply, 'D' as urut from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate between '09/01/2021' and '09/06/2021'
UNION ALL
/*AVG LY*/
select 'AVG Transaction value' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, sum(a.trx) as ly, 0 as ply, 'D' as urut
from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate between '10/01/2020' and '10/06/2020'
UNION ALL
/* UNIT / TRANSACTION
TODAY*/
select 'Unit/transaction' as deskripsi, (sum(a.qty)/sum(a.trx)) as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'E' as urut from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate = '10/06/2021'
UNION ALL
/*AVG LW*/
select 'Unit/transaction' as deskripsi, 0 as today, (sum(a.qty)/sum(a.trx)) as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'E' as urut from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate = '09/29/2021'
UNION ALL
/*AVG MTD*/
select 'Unit/transaction' as deskripsi, 0 as today, 0 as lw, 0 as plw,
(sum(a.qty)/sum(a.trx)) as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'E' as urut from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate between '10/01/2021'
and '10/05/2021'
UNION ALL
/*AVG LM*/
select 'Unit/transaction' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, (sum(a.qty)/sum(a.trx)) as lm, 0 as plm, 0 as ly, 0 as ply, 'E' as urut from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate between '09/01/2021' and '09/06/2021'
UNION ALL
/*AVG LY*/
select 'Unit/transaction' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, (sum(a.qty)/sum(a.trx)) as ly, 0 as ply, 'E' as urut
from sales_daily a
left join m_customer b on b.m_code = a.sales_store
where b.m_island = 'JAVA' and a.sales_closedate between '10/01/2020' and '10/06/2020'
) s
group by deskripsi, urut;