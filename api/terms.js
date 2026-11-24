// Shared data for the L&W subscription sign-then-pay flow.
// Terms text mirrors the Subscription Terms document v4 (2026-11-24).
// Used by api/create-checkout.js (plan metadata) and api/stripe-webhook.js
// (signed-agreement email). Keep in sync with lw-subscription-plan-terms.docx.

const PLANS = {
basic_monthly: { tierEn: 'Basic', tierZh: '基础方案', billing: 'monthly', billingZh: '月缴', amount: 99, priceEnv: 'STRIPE_PRICE_BASIC_MONTHLY'},
basic_annual: { tierEn: 'Basic', tierZh: '基础方案', billing: 'annual', billingZh: '年缴', amount: 1069, priceEnv: 'STRIPE_PRICE_BASIC_ANNUAL'},
std_monthly: { tierEn: 'Standard', tierZh: '标准方案', billing: 'monthly', billingZh: '月缴', amount: 199, priceEnv: 'STRIPE_PRICE_STD_MONTHLY'},
std_annual: { tierEn: 'Standard', tierZh: '标准方案', billing: 'annual', billingZh: '年缴', amount: 2149, priceEnv: 'STRIPE_PRICE_STD_ANNUAL'},
pre_monthly: { tierEn: 'Premium', tierZh: '至尊方案', billing: 'monthly', billingZh: '月缴', amount: 299, priceEnv: 'STRIPE_PRICE_PRE_MONTHLY'},
pre_annual: { tierEn: 'Premium', tierZh: '至尊方案', billing: 'annual', billingZh: '年缴', amount: 3229, priceEnv: 'STRIPE_PRICE_PRE_ANNUAL'},
};

const TERMS_VERSION = 'v4-2026-11-24';

const TERMS_ZH = `
<h2>1. 计划总览</h2>
<p>本计划为订阅制房屋保护服务。客户按月或按年付费，在订阅期内享有下表所列的定期检查、小维修免人工、优先预约及大工程折扣。所有档位均包含优先预约。</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>项目</th><th>Basic 基础版</th><th>Standard 标准版</th><th>Premium 至尊版</th></tr>
<tr><td>月付</td><td>$99 / 月</td><td>$199 / 月</td><td>$299 / 月</td></tr>
<tr><td>年付</td><td>$1,069 / 年</td><td>$2,149 / 年</td><td>$3,229 / 年</td></tr>
<tr><td>定期检查</td><td>2 次 / 年</td><td>2 次 / 年</td><td>4 次 / 年（每季 1 次）</td></tr>
<tr><td>大工程折扣</td><td>8 折</td><td>7.5 折</td><td>7 折</td></tr>
<tr><td>热水器保养（每年 1 次）</td><td>—</td><td>包含</td><td>包含</td></tr>
<tr><td>紧急上门免附加费（每年 1 次）</td><td>—</td><td>包含</td><td>包含</td></tr>
<tr><td>年度服务上限</td><td>$2,500</td><td>$5,000</td><td>无上限</td></tr>
<tr><td>维修金（每月累积，见第 8 节）</td><td>$50 / 月，上限 $150</td><td>$100 / 月，上限 $300</td><td>$150 / 月，上限 $450</td></tr>
<tr><td>优先预约</td><td>包含</td><td>包含</td><td>包含</td></tr>
</table>
<p><strong>年度服务上限说明：</strong>指本公司在一个订阅年度内为客户提供的、已包含在订阅费内的服务价值上限（按本公司标准人工费率计算）。超出上限的部分，按第 3 节处理。</p>
<h2>2. 包含的服务</h2>
<p><strong>定期检查（按第 1 节次数上门）：</strong></p>
<ul>
<li>冷暖气保养检查：清洗滤网、检查制冷剂、查看外机、测试排水。</li>
<li>漏水检查：水槽下方、热水器接头、马桶底座、洗衣机水管，逐一检查。</li>
<li>用电安全检查：配电箱、插座、烟雾报警器及一氧化碳报警器全面检测；报警器电池由我们更换。</li>
</ul>
<p><strong>小维修免人工（定义如下）：</strong></p>
<ul>
<li>仅限在已预约的上门服务期间处理；</li>
<li>仅限单次 60 分钟内可完成的小修；</li>
<li>每次上门最多 2 项；</li>
<li>人工免费，零件按实际成本另计（见第 3 节）；</li>
<li>不含拆机大修。</li>
</ul>
<ul>
<li>小维修范围：冷暖气、热水器、洗衣机、干衣机、冰箱、洗碗机、炉具及水暖小修；超出范围的工程按第 3 节另行报价。</li>
<li>优先预约：订阅客户在预约排序上优先于非订阅客户。</li>
<li>大工程折扣：超出小维修范围的工程，按第 1 节对应档位折扣计价，以本公司书面报价为准。</li>
<li>热水器保养（标准版及至尊版，每年 1 次）：热水器排污与检查。</li>
<li>紧急上门免附加费（标准版及至尊版，每年 1 次）：每年一次夜间紧急上门，免收附加费。</li>
</ul>
<h2>3. 不包含的服务</h2>
<p>以下项目不包含在订阅费内，如需处理，将另行说明及报价：</p>
<ul>
<li>零件与材料费：所有零件与材料按实际成本收费，凭发票原件核对；我们不在材料上加价。</li>
<li>制冷剂相关操作：须由持有 EPA Section 608 认证的人员执行，不在本计划一般服务范围内直接提供。</li>
<li>燃气相关工程：不包含在本计划内。</li>
<li>新装与更换设备（包括热水炉更换）：大型工程（整屋换管、更换锅炉等）由持牌师傅执行，另行报价，会员折扣照常适用；不适用小维修免人工。</li>
<li>需政府许可的工程：不包含在本计划内；如需办理，另行协商。</li>
<li>紧急上门附加费（金额待定；标准版及至尊版每年可免一次）：夜间紧急上门（晚 9 点至早 8 点）如产生附加费，本公司会在出车前先行说明，客户确认后才出车。</li>
<li>超出年度服务上限的部分：按本公司标准费率或对应大工程折扣另行报价，客户确认后才进行。</li>
<li>房龄与结构限制：房龄过高或存在重大结构问题的物业，我们可能无法承接。承接前会先免费上门评估、如实告知；不能承接的，我们不会勉强。</li>
</ul>
<h2>4. 服务流程</h2>
<ul>
<li>首次免费上门检查：首次上门检查免费，全程约 20 分钟；检查后出具书面《房屋健康报告》。即使客户不加入订阅，报告仍归客户所有，客户无需承担任何义务。</li>
<li>第一步，预约：客户通过电话或电邮预约上门时间。</li>
<li>第二步，上门检查：本公司按预约时间上门，按计划内容检查。</li>
<li>第三步，出具「房屋健康报告」：每次检查后提供报告，内容包括照片、检查发现及下一步建议。</li>
<li>第四步，书面报价与确认：需要跟进的项目，本公司提供书面报价；客户确认后，才安排后续工程。未经客户确认，不进行收费工程。</li>
</ul>
<h2>5. 费用与付款</h2>
<ul>
<li>付款方式：通过 Stripe 在线支付，可选月付或年付。</li>
<li>自动续费：订阅到期自动续费，除非客户在续费日前取消。</li>
<li>月付取消：可随时取消，须提前 30 天通知，效力至已付周期结束，已付费用不退。</li>
<li>年付取消退款：7 天内可全额退款；7 天后按剩余月份比例退款，并扣除已使用服务的费用。</li>
<li>逾期未付：如订阅费逾期未付，本公司可暂停服务，直至款项付清。</li>
</ul>
<h2>6. 客户配合事项</h2>
<ul>
<li>提供进出安排，确保检查人员可进入需检查的区域。</li>
<li>如实告知已知问题，包括过往漏水、故障及已做过的维修。</li>
<li>宠物安置：上门期间请妥善安置宠物，确保人员可安全工作。</li>
<li>改期通知：如需改期，请提前至少 24 小时通知本公司。</li>
</ul>
<h2>7. 合规与责任</h2>
<ul>
<li>本公司仅在自身持牌及合法可提供服务的范围内提供服务，不作未持有牌照的声称。</li>
<li>超出本公司范围的工程，由持牌合作方执行。</li>
<li>本计划服务以第 1 节所列年度服务上限为限（Premium 除外）。</li>
<li>本文件为双方最终签署版本；签署后生效。</li>
</ul>
<h2>8. 维修金</h2>
<ul>
<li>每月无叫修，月费的一半转为维修金：基础版 $50、标准版 $100、至尊版 $150。</li>
<li>维修金最多累积 3 个月：基础版上限 $150、标准版上限 $300、至尊版上限 $450。</li>
<li>维修金只可抵零件与材料费用，不可抵人工费；小维修人工本身已免（见第 2 节）。</li>
<li>每次维修先扣维修金，不足部分由客户按实际成本补付。</li>
<li>维修金按标准月费计算，月缴与年缴相同。</li>
<li>取消订阅即失效，不可兑现、不可转让。</li>
</ul>
`;

const TERMS_EN = `
<h2>1. Plan overview</h2>
<p>This is a subscription home protection plan. Members pay monthly or annually and, during the subscription term, receive the scheduled inspections, labor-free small repairs, priority scheduling, and major-project discounts listed below. Priority scheduling is included in every tier.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Item</th><th>Basic</th><th>Standard</th><th>Premium</th></tr>
<tr><td>Monthly</td><td>$99 / month</td><td>$199 / month</td><td>$299 / month</td></tr>
<tr><td>Annual</td><td>$1,069 / year</td><td>$2,149 / year</td><td>$3,229 / year</td></tr>
<tr><td>Inspections</td><td>2 per year</td><td>2 per year</td><td>4 per year (quarterly)</td></tr>
<tr><td>Major-project discount</td><td>20% off</td><td>25% off</td><td>30% off</td></tr>
<tr><td>Water-heater maintenance (once a year)</td><td>—</td><td>Included</td><td>Included</td></tr>
<tr><td>Emergency visit surcharge waived (once a year)</td><td>—</td><td>Included</td><td>Included</td></tr>
<tr><td>Annual service cap</td><td>$2,500</td><td>$5,000</td><td>No cap</td></tr>
<tr><td>Repair credit (accrues monthly, see Section 8)</td><td>$50 / month, $150 max</td><td>$100 / month, $300 max</td><td>$150 / month, $450 max</td></tr>
<tr><td>Priority scheduling</td><td>Included</td><td>Included</td><td>Included</td></tr>
</table>
<p><strong>Annual service cap:</strong> the maximum value of services included in the subscription fee in one subscription year, calculated at our standard labor rates. Work beyond the cap is handled under Section 3.</p>
<h2>2. What's included</h2>
<p><strong>Scheduled inspections (number of visits as in Section 1):</strong></p>
<ul>
<li>Heating and cooling maintenance check: filters cleaned, refrigerant checked, outdoor unit inspected, drainage tested.</li>
<li>Leak check: under every sink, water-heater joints, toilet bases, and washer hoses — each checked in turn.</li>
<li>Electrical safety check: panel, outlets, smoke and CO alarms — all tested; alarm batteries are replaced for you.</li>
</ul>
<p><strong>Labor-free small repairs (defined as follows):</strong></p>
<ul>
<li>Handled only during a scheduled visit;</li>
<li>Limited to small repairs that can be completed within 60 minutes per visit;</li>
<li>Maximum of 2 items per visit;</li>
<li>Labor is free; parts are charged at actual cost (see Section 3);</li>
<li>Does not include teardown or major overhaul work.</li>
</ul>
<ul>
<li>Small-repair scope: heating and cooling, water heaters, washers, dryers, refrigerators, dishwashers, stoves, and minor plumbing; work beyond this scope is quoted separately under Section 3.</li>
<li>Priority scheduling: members are scheduled ahead of non-members.</li>
<li>Major-project discount: work beyond the small-repair scope is priced at the tier discount in Section 1, based on our written quote.</li>
<li>Water-heater maintenance (Standard and Premium, once a year): water-heater drain and inspection.</li>
<li>Emergency visit surcharge waived (Standard and Premium, once a year): one after-hours emergency visit per year with the surcharge waived.</li>
</ul>
<h2>3. What's not included</h2>
<p>The following are not included in the subscription fee. Where we can help, we will explain the options and quote separately:</p>
<ul>
<li>Parts and materials: all parts and materials are charged at actual cost, verifiable against the original invoices; we never mark up materials.</li>
<li>Refrigerant work: must be performed by EPA Section 608 certified personnel and is not provided directly under the plan's general services.</li>
<li>Gas work: not included in this plan.</li>
<li>New installations and equipment replacement (including water heater replacement): major projects (such as full repiping or boiler replacement) are performed by licensed contractors and quoted separately; your member discount still applies; labor-free small repairs do not apply.</li>
<li>Work requiring a government permit: not included in this plan; arrangements, if any, will be discussed separately.</li>
<li>Emergency visit surcharge (amount to be determined; Standard and Premium members get one waiver per year): for after-hours emergency visits (9 PM to 8 AM), if a surcharge applies, we will state it before dispatch, and will only dispatch after the customer confirms.</li>
<li>Work beyond the annual service cap: quoted at our standard rates or the applicable major-project discount, and carried out only after the customer confirms.</li>
<li>Age and structural limits: properties that are very old or have major structural issues may be beyond what we can take on. We assess every property in person, free of charge, and tell you honestly — if we can't take it on, we won't pretend otherwise.</li>
</ul>
<h2>4. How it works</h2>
<ul>
<li>Free first visit: the first visit is free of charge and takes about 20 minutes; after the visit you receive a written Home Health Report. Even if you do not join the plan, the report is yours to keep, with no obligation.</li>
<li>Step 1 — Book: the customer books a visit by phone or email.</li>
<li>Step 2 — Visit and inspection: we attend at the booked time and inspect as set out in the plan.</li>
<li>Step 3 — Home Health Report: after each inspection we provide a report with photos, findings, and recommended next steps.</li>
<li>Step 4 — Written quote and confirmation: follow-up work is quoted in writing. We schedule it only after the customer confirms. No chargeable work is carried out without confirmation.</li>
</ul>
<h2>5. Fees and payment</h2>
<ul>
<li>Payment method: online payment via Stripe, monthly or annual.</li>
<li>Auto-renewal: the subscription renews automatically unless the customer cancels before the renewal date.</li>
<li>Monthly cancellation: may be cancelled at any time with 30 days' notice, effective at the end of the paid period; amounts already paid are not refunded.</li>
<li>Annual cancellation refunds: full refund within 7 days; after 7 days, refund pro-rated by remaining months, minus the cost of services already used.</li>
<li>Late payment: if subscription fees are overdue, we may pause service until payment is received.</li>
</ul>
<h2>6. What we need from you</h2>
<ul>
<li>Provide access so our technician can enter all areas to be inspected.</li>
<li>Tell us about known issues, including past leaks, faults, and repairs already done.</li>
<li>Secure pets during the visit so work can be carried out safely.</li>
<li>Give at least 24 hours' notice to reschedule.</li>
</ul>
<h2>7. Compliance and liability</h2>
<ul>
<li>We provide services only within the scope we are licensed and lawfully permitted to provide, and we make no claim to hold a license we do not hold.</li>
<li>Work outside our scope is performed by licensed partners.</li>
<li>Plan services are limited to the annual service cap in Section 1 (except Premium, which has no cap).</li>
<li>This document is the final signed version of the agreement; it takes effect once signed.</li>
</ul>
<h2>8. Repair credit</h2>
<ul>
<li>Each month with no service call, half your monthly fee banks as repair credit: Basic $50, Standard $100, Premium $150.</li>
<li>Credit accrues for up to 3 months: Basic $150 max, Standard $300 max, Premium $450 max.</li>
<li>Credit offsets parts and materials costs only, not labor; labor for small repairs is already free (see Section 2).</li>
<li>Each repair draws down credit first; any shortfall is paid by the customer at actual cost.</li>
<li>Credit is calculated on the standard monthly fee, the same for monthly and annual billing.</li>
<li>Credit expires on cancellation. It cannot be cashed out or transferred.</li>
</ul>
`;

function esc(s) {
return String(s == null? '': s)
.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
.replace(/"/g, '&quot;');
}

// Build the signed-agreement email sent after a successful payment.
// Sent to both the customer and support@lw-propertysolutions.com.
function buildAgreementEmail(d) {
const isZh = d.lang === 'zh';
const plan = PLANS[d.planKey] || {};
const terms = isZh? TERMS_ZH: TERMS_EN;
const planLabel = isZh
? `${plan.tierZh || ''} ${plan.billingZh || ''}`
: `${plan.tierEn || ''} ${plan.billing || ''}`;
const amount = d.amount!= null
? `$${d.amount.toFixed(2)} ${(d.currency || 'USD').toUpperCase()}`
: (plan.amount!= null? `$${plan.amount}`: '');
const signedAt = d.signedAt? new Date(d.signedAt).toLocaleString(isZh? 'zh-CN': 'en-US'): '';
const subject = isZh
? `已签署的订阅条款副本 — ${planLabel}`
: `[L&W] Your signed subscription agreement — ${planLabel}`;
const html = isZh? `
<p>您好，</p>
<p>感谢您订阅 L&W Property Solutions 房屋保护计划。附件内容为双方已签署的订阅条款副本，请妥善保存。</p>
<h3>签署记录</h3>
<ul>
<li>客户姓名：${esc(d.name)}</li>
<li>电邮：${esc(d.email)}</li>
<li>联系电话：${esc(d.phone)}</li>
<li>订阅方案：${esc(planLabel)}（${esc(amount)}）</li>
<li>电子签名：${esc(d.signature)}</li>
<li>签署时间：${esc(signedAt)}</li>
<li>付款编号：${esc(d.sessionId)}</li>
<li>条款版本：${TERMS_VERSION}</li>
</ul>
<p>客户签署即表示已阅读、理解并同意以下全部条款。本条款经客户签署并完成首次付款后生效。</p>
<hr>
<h2>房屋保护订阅计划 — 条款</h2>
<p>L&W Home Solutions LLC • 服务区域：Brooklyn、Queens、Manhattan、Staten Island • 电话：(347) 989-2686 • 电邮：support@lw-propertysolutions.com</p>
${terms}
<hr>
<p>L&W Property Solutions (L&W Home Solutions LLC) • Brooklyn, Queens, Manhattan, Staten Island • (347) 989-2686 • support@lw-propertysolutions.com</p>
`: `
<p>Hello,</p>
<p>Thank you for subscribing to the L&W Property Solutions Property Protection Plan. Below is a copy of the subscription agreement signed by both parties. Please keep it for your records.</p>
<h3>Signature record</h3>
<ul>
<li>Customer name: ${esc(d.name)}</li>
<li>Email: ${esc(d.email)}</li>
<li>Phone: ${esc(d.phone)}</li>
<li>Plan: ${esc(planLabel)} (${esc(amount)})</li>
<li>Electronic signature: ${esc(d.signature)}</li>
<li>Signed at: ${esc(signedAt)}</li>
<li>Payment reference: ${esc(d.sessionId)}</li>
<li>Terms version: ${TERMS_VERSION}</li>
</ul>
<p>By signing, the customer confirms that they have read, understood, and agree to all terms below. This agreement takes effect once the customer has signed and completed the first payment.</p>
<hr>
<h2>Property Protection Plan — Subscription Terms</h2>
<p>L&W Home Solutions LLC • Service area: Brooklyn, Queens, Manhattan, Staten Island • Phone: (347) 989-2686 • Email: support@lw-propertysolutions.com</p>
${terms}
<hr>
<p>L&W Property Solutions (L&W Home Solutions LLC) • Brooklyn, Queens, Manhattan, Staten Island • (347) 989-2686 • support@lw-propertysolutions.com</p>
`;
return { subject, html};
}

module.exports = { PLANS, TERMS_VERSION, TERMS_ZH, TERMS_EN, buildAgreementEmail};
