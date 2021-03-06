DELETE FROM rpt_sales_all;
INSERT INTO rpt_sales_all(deskripsi, today, lw, plw, mtd, lm, plm, ly, ply, tanggal, urut)
/*ALL STORE*/
(select DISTINCT deskripsi, sum(today) as today,(sum(lw)) as lw, (sum(today)/sum(lw)) as plw,
sum(mtd) as mtd, (sum(lm)) as lm,(sum(mtd)/sum(lm)) as plm,
sum(ly) as ly, (sum(mtd) /sum(ly)) as ply, to_date('20211006', 'YYYYMMDD') as tanggal, urut from (

/*NET SALES
today */
select 'Net Sales' as deskripsi, sum(net) as today, 0 as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut
from vnet where
sales_closedate = '10/06/2021'
UNION ALL
select 'Net Sales' as deskripsi, sum(amt) as today, 0 as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut from gross where
sales_closedate = '10/06/2021'
UNION ALL
/*lw*/
select 'Net Sales' as deskripsi, 0 as today, sum(net) as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut from vnet where
sales_closedate = '09/29/2021'
UNION ALL
select 'Net Sales' as deskripsi, 0 as today, sum(amt) as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut from gross where
sales_closedate = '09/29/2021'
UNION ALL
/*mtd*/
select 'Net Sales' as deskripsi, 0 as today, 0 as lw, 0 as plw, sum(net) as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut from vnet
where sales_closedate between '10/01/2021' and '10/05/2021'
UNION ALL
select 'Net Sales' as deskripsi, 0 as today, 0 as lw, 0 as plw, sum(amt) as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut
from gross where
sales_closedate BETWEEN '10/01/2021' and '10/06/2021'
UNION ALL
/*LM*/
select 'Net Sales' as deskripsi, 0 as today, 0 as lw, 0 as plw, 0 as mtd,
sum(net) as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut
from vnet where sales_store in (select sales_store from vnet where sales_closedate
between '09/01/2020' and '09/06/2020') and sales_closedate between '09/01/2021' and '09/06/2021'
UNION ALL
select 'Net Sales' as deskripsi, 0 as today, 0 as lw, 0 as plw, 0 as mtd,
sum(amt) as lm, 0 as plm, 0 as ly, 0 as ply, 'A' as urut
from gross where sales_closedate between '09/01/2021' and '09/06/2021'
UNION ALL
/*LY*/
select 'Net Sales' as deskripsi, 0 as today, 0 as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, sum(net) as ly, 0 as ply, 'A' as urut
from vnet where sales_closedate BETWEEN '10/01/2020' and '10/06/2020'
UNION ALL
select 'Net Sales' as deskripsi, 0 as today, 0 as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, sum(amt) as ly, 0 as ply, 'A' as urut
from gross where sales_closedate between '10/01/2020' and '10/06/2020'
UNION ALL
/*NET SALES/DAY/STORE
TODAY*/
select 'Net sales/day/store' as deskripsi, sum(net)/189 as today, 0 as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from vnet where sales_closedate = '10/06/2021'
UNION ALL
select 'Net sales/day/store' as deskripsi, sum(amt)/4 as today, 0 as lw, 0 as plw, 0 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from gross where sales_closedate = '10/06/2021'
UNION ALL
/*LW*/
select 'Net sales/day/store' as deskripsi, 0 as today, sum(net)/189 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from vnet where sales_closedate = '09/29/2021'
UNION ALL
select 'Net sales/day/store' as deskripsi, 0 as today, sum(amt)/189 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from gross where sales_closedate = '09/29/2021'
UNION ALL
/*MTD*/
select 'Net sales/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
(sum(net)/6)/189 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from vnet
where sales_closedate between '10/01/2021'
and '10/06/2021'
UNION ALL
select 'Net sales/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw, (sum(amt)/6)/189 as mtd,
0 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from gross where
sales_closedate BETWEEN '10/01/2021' and '10/06/2021'
UNION ALL
/*LM*/
select 'Net sales/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, (sum(net)/30)/189 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from vnet
where sales_closedate between '09/06/2021'
and '10/05/2021'
UNION ALL
select 'Net sales/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw, 0 as mtd,
(sum(amt)/30)/189 as lm, 0 as plm, 0 as ly, 0 as ply, 'B' as urut
from gross where
sales_closedate BETWEEN '09/06/2021' and '10/05/2021'
UNION ALL
/*LY*/
select 'Net sales/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, (sum(net)/6)/295 as ly, 0 as ply, 'B' as urut
from vnet where sales_closedate between '10/01/2020' and '10/06/2020'
UNION ALL
select 'Net sales/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, (sum(amt)/6)/295 as ly, 0 as ply, 'B' as urut
from gross where sales_closedate between '10/01/2020' and '10/06/2020'
UNION ALL
/*AVG TRANSACTION
AVG TRX*/
select 'AVG Transaction/day/store' as deskripsi, avg(trx) as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'C' as urut from sales_daily where sales_closedate = '10/06/2021'
UNION ALL
/*AVG LW*/
select 'AVG Transaction/day/store' as deskripsi, 0 as today, avg(trx) as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'C' as urut from sales_daily where sales_closedate = '09/29/2021'
UNION ALL
/*AVG MTD*/
select 'AVG Transaction/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
avg(trx) as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'C' as urut from sales_daily
where sales_store in (select sales_store from sales_daily where sales_closedate
between '10/01/2020' and '10/05/2020') and sales_closedate between '10/01/2021'
and '10/05/2021'
UNION ALL
/*AVG LM*/
select 'AVG Transaction/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, avg(trx) as lm, 0 as plm, 0 as ly, 0 as ply, 'C' as urut from sales_daily
where sales_closedate between '09/01/2021' and '09/06/2021'
UNION ALL
/*AVG LY*/
select 'AVG Transaction/day/store' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, avg(trx) as ly, 0 as ply, 'C' as urut
from sales_daily where sales_closedate between '10/01/2020' and '10/06/2020'
UNION ALL
/* AVG TRANSACTION VALUE
AVG TRX*/
select 'AVG Transaction value' as deskripsi, sum(trx) as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'D' as urut from sales_daily where sales_closedate = '10/06/2021'
UNION ALL
/*AVG LW*/
select 'AVG Transaction value' as deskripsi, 0 as today, sum(trx) as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'D' as urut from sales_daily where sales_closedate = '09/29/2021'
UNION ALL
/*AVG MTD*/
select 'AVG Transaction value' as deskripsi, 0 as today, 0 as lw, 0 as plw,
sum(trx) as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'D' as urut from sales_daily
where sales_closedate between '10/01/2021'
and '10/05/2021'
UNION ALL
/*AVG LM*/
select 'AVG Transaction value' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, sum(trx) as lm, 0 as plm, 0 as ly, 0 as ply, 'D' as urut from sales_daily
where sales_closedate between '09/01/2021' and '09/06/2021'
UNION ALL
/*AVG LY*/
select 'AVG Transaction value' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, sum(trx) as ly, 0 as ply, 'D' as urut
from sales_daily where sales_closedate between '10/01/2020' and '10/06/2020'
UNION ALL
/* UNIT / TRANSACTION
TODAY*/
select 'Unit/transaction' as deskripsi, (sum(qty)/sum(trx)) as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'E' as urut from sales_daily where sales_closedate = '10/06/2021'
UNION ALL
/*AVG LW*/
select 'Unit/transaction' as deskripsi, 0 as today, (sum(qty)/sum(trx)) as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'E' as urut from sales_daily where sales_closedate = '09/29/2021'
UNION ALL
/*AVG MTD*/
select 'Unit/transaction' as deskripsi, 0 as today, 0 as lw, 0 as plw,
(sum(qty)/sum(trx)) as mtd, 0 as lm, 0 as plm, 0 as ly, 0 as ply, 'E' as urut from sales_daily
where sales_closedate between '10/01/2021'
and '10/05/2021'
UNION ALL
/*AVG LM*/
select 'Unit/transaction' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, (sum(qty)/sum(trx)) as lm, 0 as plm, 0 as ly, 0 as ply, 'E' as urut from sales_daily
where sales_closedate between '09/01/2021' and '09/06/2021'
UNION ALL
/*AVG LY*/
select 'Unit/transaction' as deskripsi, 0 as today, 0 as lw, 0 as plw,
0 as mtd, 0 as lm, 0 as plm, (sum(qty)/sum(trx)) as ly, 0 as ply, 'E' as urut
from sales_daily where sales_closedate between '10/01/2020' and '10/06/2020'
) s
group by deskripsi, urut);