import {AppShell} from "@/components/AppShell"; import {projects,totals} from "@/data/projects"; import {analyzeProject} from "@/lib/sentinel"; import DemoButton from "@/components/DemoButton"; import LiveNotification from "@/components/LiveNotification"; import Link from "next/link"; export default async function Page({params}:{params:Promise<{slug:string[]}>}){const {slug}=await params;const route=slug.join("/"); if(route.startsWith("projects/")){const p=projects.find(x=>x.id===route.split("/")[1]);if(!p)return <AppShell><div className="page"><h2>Project not found</h2></div></AppShell>;const r=analyzeProject(p);return <AppShell><div className="page"><Link href="/projects" className="back">← Back to projects</Link><div className="page-head"><div><span className={`tag ${p.status.toLowerCase().replace(" ","-")}`}>{p.status}</span><h2>{p.name}</h2><p>{p.id} Â· {p.category} Â· {p.district}</p></div><DemoButton/></div><div className="metrics"><Metric a="Physical progress" b={`${p.progress}%`}/><Metric a="Fund utilization" b={`${Math.round(p.utilized/p.budget*100)}%`}/><Metric a="Sentinel risk" b={`${r.score}/100`}/><Metric a="Beneficiaries" b={p.beneficiaries.toLocaleString("en-IN")}/></div><div className="grid-2"><section className="card"><h3>Sentinel evidence</h3>{r.evidence.map(e=><div className="evidence-row" key={e.title}><b>⚠  {e.title}</b><span>{e.detail}</span></div>)}</section><section className="card"><h3>Project profile</h3><Info a="Planned duration" b={`${p.planned} days`}/><Info a="Actual duration" b={`${p.actual} days`}/><Info a="Last field update" b={`${p.stale} days ago`}/><Info a="Coordinates" b={`${p.lat}Â° N, ${p.lng}Â° E`}/></section></div><section className="card"><h3>Recommended action</h3><div className="recommend"><b>Human review required</b><p>{r.recommendation}</p></div><small className="disclaimer">Sentinel risk indicators are decision support and do not establish fraud or misconduct.</small></section></div></AppShell>}
return <AppShell><div className="page">{renderRoute(route)}</div></AppShell>}
function Metric({a,b}:{a:string,b:string}){return <div className="metric"><span>{a}</span><b>{b}</b><small>Current demo view</small></div>} function Info({a,b}:{a:string,b:string}){return <div className="info-row"><span>{a}</span><b>{b}</b></div>}
function renderRoute(r:string){if(r==="dashboard")return <Dashboard/>;if(r==="projects")return <Projects/>;if(r==="ai")return <AI/>;if(r==="map")return <Map/>;if(r==="funds")return <Funds/>;if(r==="analytics")return <Analytics/>;if(r==="feedback")return <Feedback/>;if(r==="notifications")return <Notifications/>;if(r==="reports")return <Reports/>;if(r==="rankings")return <Rankings/>;if(r==="mp")return <Role title="MP Dashboard" sub="Constituency oversight and development outcomes."/>;if(r==="district")return <Role title="District Authority" sub="Verification queue, agencies and delayed works."/>;if(r==="field")return <Field/>;if(r==="citizen")return <Citizen/>;if(r==="settings")return <Settings/>;if(r==="login")return <Login/>;return <><span className="eyebrow">MPLAD SENTINEL AI</span><h2>Page not found</h2><p>Use the command center navigation.</p></>}
function Dashboard(){const critical=projects.filter(p=>p.status==="Critical"||p.status==="Delayed").length;return <><div className="page-head"><div><span className="eyebrow">OPERATIONS OVERVIEW</span><h2>Monitoring overview</h2><p>Live simulation of MPLAD implementation health.</p></div><DemoButton/></div><div className="metrics"><Metric a="Tracked projects" b={`${projects.length}`}/><Metric a="Total allocation" b={`\u20B9${(totals.allocated/1e7).toFixed(2)}Cr`}/><Metric a="Fund utilization" b={`${Math.round(totals.utilized/totals.allocated*100)}%`}/><Metric a="Escalation queue" b={`${critical}`}/></div><div className="grid-2"><section className="card"><h3>Implementation health</h3><p>Current portfolio distribution</p><div className="health">{[["On Track",projects.filter(p=>p.status==="On Track").length], ["At Risk",projects.filter(p=>p.status==="At Risk").length],["Delayed",projects.filter(p=>p.status==="Delayed").length],["Critical",projects.filter(p=>p.status==="Critical").length]].map(x=><div key={x[0]}><span>{x[0]}</span><i style={{width:`${Number(x[1])/projects.length*100}%`}}></i><b>{x[1]}</b></div>)}</div></section><section className="card"><h3>Priority queue</h3>{projects.filter(p=>p.status!=="On Track").slice(0,6).map(p=><Link className="list-row" key={p.id} href={`/projects/${p.id}`}><span><b>{p.name}</b><small>{p.id} Â· {p.district}</small></span><em className={`tag ${p.status.toLowerCase().replace(" ","-")}`}>{p.status}</em><strong>{p.progress}%</strong></Link>)}</section></div></>}
function Projects(){return <><div className="page-head"><div><span className="eyebrow">PROJECT REGISTRY</span><h2>All MPLAD works</h2><p>20 realistic demo projects across multiple districts and categories.</p></div></div><div className="table-wrap"><table><thead><tr><th>Project</th><th>District</th><th>Category</th><th>Progress</th><th>Funds</th><th>Status</th></tr></thead><tbody>{projects.map(p=><tr key={p.id}><td><Link href={`/projects/${p.id}`}><b>{p.name}</b><small>{p.id}</small></Link></td><td>{p.district}</td><td>{p.category}</td><td>{p.progress}%</td><td>\u20B9{(p.utilized/1e5).toFixed(1)}L / \u20B9{(p.budget/1e5).toFixed(1)}L</td><td><span className={`tag ${p.status.toLowerCase().replace(" ","-")}`}>{p.status}</span></td></tr>)}</tbody></table></div></>}
function AI(){const risks=projects.map(analyzeProject).sort((a,b)=>b.score-a.score);return <><div className="page-head"><div><span className="eyebrow">SENTINEL AI ENGINE</span><h2>AI Command Center</h2><p>Evidence-first risk scoring for delays, financial mismatch and stale field updates.</p></div><DemoButton/></div><div className="ai-banner"><b>✦ MODEL ONLINE</b><span>Rule + signal engine. Risk score + evidence + recommended action. Human decision remains final.</span></div><div className="risk-grid">{risks.slice(0,8).map(r=><Link href={`/projects/${r.project.id}`} className="risk-card" key={r.project.id}><span className={`tag ${r.level.toLowerCase().replace(" ","-")}`}>{r.level}</span><h3>{r.project.name}</h3><strong>{r.score}<small>/100</small></strong><p>{r.evidence.length} evidence signals Â· {r.project.district}</p></Link>)}</div></>}
function Map(){
  const mapProjects = projects.slice(0, 20);

  const districtLabels = [
    ["Morena", 42, 10], ["Gwalior", 45, 18], ["Bhind", 53, 18],
    ["Shivpuri", 44, 28], ["Guna", 40, 36], ["Ashoknagar", 49, 35],
    ["Sagar", 52, 48], ["Rewa", 73, 31], ["Satna", 68, 37],
    ["Sidhi", 78, 40], ["Jabalpur", 66, 52], ["Mandla", 70, 67],
    ["Dindori", 77, 60], ["Balaghat", 75, 77], ["Chhindwara", 60, 67],
    ["Bhopal", 48, 57], ["Vidisha", 54, 51], ["Raisen", 51, 47],
    ["Sehore", 43, 52], ["Rajgarh", 37, 43], ["Ujjain", 27, 47],
    ["Dewas", 34, 53], ["Indore", 25, 61], ["Dhar", 18, 65],
    ["Jhabua", 12, 58], ["Ratlam", 18, 48], ["Khandwa", 31, 72],
    ["Burhanpur", 29, 82], ["Betul", 48, 73], ["Hoshangabad", 52, 65]
  ];

  const markerPositions = [
    [34,14],[48,21],[57,19],[43,30],[55,34],
    [67,29],[75,37],[38,43],[49,48],[61,47],
    [70,54],[78,46],[44,58],[54,61],[64,67],
    [32,66],[47,76],[58,72],[26,78],[72,79]
  ];

  return (
    <div className="live-map-page">

      <div className="map-toolbar">
        <div>
          <span className="eyebrow">GEO-TAGGED MONITORING</span>
          <h2>Live Map</h2>
          <p>Real-time view of MPLAD projects across Madhya Pradesh</p>
        </div>

        <div className="map-filters">
          <button className="map-filter">⌖ All Districts <span>⌄</span></button>
          <button className="map-filter">◉ All Status <span>⌄</span></button>
          <button className="map-filter">▧ Satellite <span>⌄</span></button>
          <button className="map-expand">⛶</button>
        </div>
      </div>

      <div className="map-stat-grid">
        <div className="map-stat">
          <strong>248</strong>
          <span>Total Projects</span>
        </div>

        <div className="map-stat green">
          <strong>182</strong>
          <span>On Track</span>
        </div>

        <div className="map-stat yellow">
          <strong>38</strong>
          <span>At Risk</span>
        </div>

        <div className="map-stat red">
          <strong>22</strong>
          <span>Delayed</span>
        </div>

        <div className="map-stat blue">
          <strong>6</strong>
          <span>Under Review</span>
        </div>
      </div>

      <div className="map-layout">

        <div className="map-main">

          <div className="map-canvas">

            <div className="map-layer-switch">
              <button>Map</button>
              <button className="active">Satellite</button>
            </div>

            <div className="map-controls">
              <button>◎</button>
              <button>+</button>
              <button>−</button>
              <button>◉</button>
            </div>

            <div className="neighbor neighbor-rajasthan">RAJASTHAN</div>
            <div className="neighbor neighbor-up">UTTAR PRADESH</div>
            <div className="neighbor neighbor-chhattisgarh">CHHATTISGARH</div>
            <div className="neighbor neighbor-maharashtra">MAHARASHTRA</div>

            <svg
              className="map-svg"
              viewBox="0 0 1000 650"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="terrain" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" />
                  <stop offset="45%" />
                  <stop offset="100%" />
                </linearGradient>

                <filter id="mapGlow">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>

              <rect width="1000" height="650" fill="url(#terrain)" />

              {/* terrain texture */}
              <g className="terrain-lines">
                <path d="M0 180 Q180 80 350 170 T700 130 T1000 190" />
                <path d="M0 300 Q200 230 380 320 T720 270 T1000 330" />
                <path d="M0 430 Q180 350 390 440 T720 390 T1000 450" />
                <path d="M40 600 Q220 480 430 550 T760 500 T1000 570" />
                <path d="M130 0 Q260 160 210 310 T260 650" />
                <path d="M430 0 Q520 150 470 300 T510 650" />
                <path d="M730 0 Q650 160 720 320 T690 650" />
              </g>

              {/* rivers */}
              <g className="map-rivers">
                <path d="M80 40 C220 160 310 110 390 230 S610 330 720 430 S860 540 970 600" />
                <path d="M530 0 C490 120 560 190 520 290 S550 430 500 650" />
              </g>

              {/* roads */}
              <g className="map-roads">
                <path d="M80 160 L270 240 L430 310 L600 380 L820 470" />
                <path d="M220 80 L300 220 L390 360 L470 520 L610 620" />
                <path d="M420 70 L500 190 L600 300 L720 420 L800 590" />
                <path d="M120 390 L300 360 L500 370 L700 340 L920 290" />
                <path d="M250 560 L390 500 L560 480 L760 510 L930 570" />
              </g>

              {/* MP boundary */}
              <path
                className="mp-boundary"
                d="M220 100
                   L330 45
                   L470 65
                   L590 105
                   L760 170
                   L850 275
                   L820 390
                   L875 500
                   L770 590
                   L620 615
                   L500 585
                   L370 610
                   L245 550
                   L175 430
                   L120 330
                   L155 210 Z"
              />

              {/* selected project glow */}
              <circle
                cx="710"
                cy="390"
                r="32"
                className="selected-glow"
              />
            </svg>

            {/* District labels */}
            {districtLabels.map(([name,left,top]) => (
              <span
                key={name}
                className={`district-label ${
                  name === "Dindori" ? "selected-district" : ""
                }`}
                style={{
                  left: `${left}%`,
                  top: `${top}%`
                }}
              >
                {name}
              </span>
            ))}

            {/* Project markers */}
            {mapProjects.map((p, i) => {
              const [left, top] = markerPositions[i];
              const critical = p.id === "MP-2026-003";
              const statusClass =
                p.status.toLowerCase().replace(" ", "-");

              return (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className={`geo-pin ${statusClass} ${
                    critical ? "selected-pin" : ""
                  }`}
                  style={{
                    left: `${left}%`,
                    top: `${top}%`
                  }}
                  title={`${p.id} · ${p.name}`}
                >
                  <span />
                </Link>
              );
            })}

            {/* Critical project tooltip */}
            <Link
              href="/projects/MP-2026-003"
              className="map-project-tooltip"
            >
              <strong>MP-2026-003</strong>
              <span>Village Water Supply</span>
              <em>Risk: 92/100</em>
            </Link>

            <div className="map-scale">
              <i />
              <span>50 km</span>
            </div>

          </div>

          {/* Live feed */}
          <div className="map-activity">
            <div className="activity-title">
              <span className="live-dot" />
              <strong>Recent Project Activity (Live Feed)</strong>
            </div>

            <div className="activity-item">
              <span className="activity-green" />
              <div>
                <b>MP-2026-011</b>
                <small>School Upgrade</small>
              </div>
              <span>Field update received</span>
              <time>5 mins ago</time>
            </div>

            <div className="activity-item">
              <span className="activity-yellow" />
              <div>
                <b>MP-2026-007</b>
                <small>Road Development</small>
              </div>
              <span>Status changed to At Risk</span>
              <time>12 mins ago</time>
            </div>

            <div className="activity-item">
              <span className="activity-green" />
              <div>
                <b>MP-2026-021</b>
                <small>Health Center</small>
              </div>
              <span>Fund utilization updated</span>
              <time>18 mins ago</time>
            </div>
          </div>

        </div>

        {/* RIGHT INTELLIGENCE PANEL */}
        <aside className="map-intelligence">

          <div className="project-photo">
            <div className="water-tank">
              <div className="tank-top" />
              <div className="tank-body" />
              <div className="tank-legs">
                <i /><i /><i /><i />
              </div>
            </div>
          </div>

          <span className="critical-badge">● CRITICAL RISK</span>

          <h3>MP-2026-003</h3>
          <p className="project-type">Village Water Supply Scheme</p>

          <div className="project-location">
            <span>⌖</span>
            Dindori, Madhya Pradesh
          </div>

          <div className="map-metric">
            <div>
              <span>Physical Progress</span>
              <b>28%</b>
            </div>
            <i><em style={{width:"28%"}} /></i>
          </div>

          <div className="map-metric danger">
            <div>
              <span>Funds Utilized</span>
              <b>81%</b>
            </div>
            <i><em style={{width:"81%"}} /></i>
          </div>

          <div className="map-metric warning">
            <div>
              <span>Schedule Variance</span>
              <b>72%</b>
            </div>
            <i><em style={{width:"72%"}} /></i>
          </div>

          <div className="last-update">
            <span>Last Field Update</span>
            <b>21 days ago</b>
          </div>

          <Link
            href="/projects/MP-2026-003"
            className="map-details-btn"
          >
            View Full Details <span>→</span>
          </Link>

          <div className="nearby-projects">
            <h4>Nearby Projects</h4>

            <Link href="/projects/MP-2026-004">
              <span className="nearby-dot yellow" />
              <div>
                <b>MP-2026-004</b>
                <small>Rural Road</small>
                <em>12 km · At Risk</em>
              </div>
            </Link>

            <Link href="/projects/MP-2026-005">
              <span className="nearby-dot green" />
              <div>
                <b>MP-2026-005</b>
                <small>School Building</small>
                <em>18 km · On Track</em>
              </div>
            </Link>

            <Link href="/projects/MP-2026-006">
              <span className="nearby-dot red" />
              <div>
                <b>MP-2026-006</b>
                <small>Community Hall</small>
                <em>26 km · Delayed</em>
              </div>
            </Link>
          </div>

        </aside>

      </div>
    </div>
  );
}
function Funds(){return <><div className="page-head"><div><span className="eyebrow">FINANCIAL MONITORING</span><h2>Fund utilization</h2><p>Allocation, utilization and physical-progress alignment.</p></div></div><div className="metrics"><Metric a="Allocated" b={`\u20B9${(totals.allocated/1e7).toFixed(2)}Cr`}/><Metric a="Utilized" b={`\u20B9${(totals.utilized/1e7).toFixed(2)}Cr`}/><Metric a="Remaining" b={`\u20B9${((totals.allocated-totals.utilized)/1e7).toFixed(2)}Cr`}/><Metric a="Mismatch watchlist" b={`${projects.filter(p=>p.utilized/p.budget*100-p.progress>25).length}`}/></div><section className="card"><h3>High expenditure vs low progress</h3>{projects.filter(p=>p.utilized/p.budget*100-p.progress>20).map(p=><Link className="list-row" key={p.id} href={`/projects/${p.id}`}><span><b>{p.name}</b><small>{p.id}</small></span><strong>{Math.round(p.utilized/p.budget*100)}% funds</strong><em>{p.progress}% physical</em></Link>)}</section></>}
function Analytics(){return <><div className="page-head"><div><span className="eyebrow">DECISION ANALYTICS</span><h2>Portfolio intelligence</h2><p>Implementation, transparency and impact indicators.</p></div></div><div className="grid-3"><Metric a="Development health" b="82.4"/><Metric a="Transparency" b="88.7"/><Metric a="Impact score" b="84.9"/></div><section className="card"><h3>Average completion by district</h3>{[...new Set(projects.map(p=>p.district))].map(d=>{const ps=projects.filter(p=>p.district===d);const v=Math.round(ps.reduce((s,p)=>s+p.progress,0)/ps.length);return <div className="health" key={d}><div><span>{d}</span><i style={{width:`${v}%`}}></i><b>{v}%</b></div></div>})}</section></>}
function Feedback(){return <section className="card form-card"><span className="eyebrow">CITIZEN OVERSIGHT</span><h2>Citizen feedback</h2><p>Submit observations for authorized verification.</p><label>Project ID<input placeholder="MP-2026-003"/></label><label>Observation<textarea placeholder="Describe what you observedâ€¦"/></label><button className="primary">Submit for verification â†’</button></section>}
function Notifications(){return <><div className="page-head"><div><span className="eyebrow">ALERT MANAGEMENT</span><h2>Notifications</h2><p>Escalations generated from monitored risk signals.</p></div><DemoButton/></div><section className="card"><h3>Latest critical alert</h3><LiveNotification/></section></>}function Reports(){return <><div className="page-head"><div><span className="eyebrow">AUDIT & REPORTING</span><h2>Reports</h2><p>Structured outputs for administrative review.</p></div></div><div className="grid-2">{["MPLAD Portfolio Health","Fund Utilization Audit","High-Risk Project Register","Field Verification Queue"].map(x=><section className="card" key={x}><h3>{x}</h3><p>Includes project indicators, evidence signals, actions and status summary.</p><button className="outline-btn">Generate report</button></section>)}</div></>}
function Rankings(){const ds=[...new Set(projects.map(p=>p.district))].map(d=>{const ps=projects.filter(p=>p.district===d);return[d,Math.round(ps.reduce((s,p)=>s+p.progress,0)/ps.length)]}).sort((a,b)=>(b[1] as number)-(a[1] as number));return <><div className="page-head"><div><span className="eyebrow">COMPARATIVE PERFORMANCE</span><h2>District rankings</h2><p>Illustrative benchmark for the demo dataset.</p></div></div><section className="card">{ds.map((x,i)=><div className="rank" key={x[0] as string}><b>#{i+1}</b><span>{x[0]}</span><i style={{width:`${x[1]}%`}}></i><strong>{x[1]}</strong></div>)}</section></>}
function Role({title,sub}:{title:string,sub:string}){
  return <>
    <div className="page-head">
      <div>
        <span className="eyebrow">ROLE WORKSPACE</span>
        <h2>{title}</h2>
        <p>{sub}</p>
      </div>
    </div>

    <div className="metrics">
      <Metric a="Active works" b="14"/>
      <Metric a="Pending review" b="7"/>
      <Metric a="Fund utilization" b="82%"/>
      <Metric a="Development score" b="88"/>
    </div>

    <section className="card">
      <h3>Oversight Summary</h3>
      <div className="steps">
        <p>Project approvals and monitoring</p>
        <p>Agency performance tracking</p>
        <p>Delayed project escalation</p>
        <p>Administrative review workflow</p>
      </div>
    </section>
  </>
}

function Field(){
  return <>
    <div className="page-head">
      <div>
        <span className="eyebrow">FIELD OPERATIONS</span>
        <h2>Field Officer</h2>
        <p>Ground-level project verification, inspection and geo-tagged evidence.</p>
      </div>
      <Link href="/projects/MP-2026-003" className="primary">
        Open Critical Project
      </Link>
    </div>

    <div className="metrics">
      <Metric a="Assigned works" b="14"/>
      <Metric a="Pending inspections" b="7"/>
      <Metric a="Updates this week" b="18"/>
      <Metric a="Evidence verified" b="92%"/>
    </div>

    <div className="grid-2">
      <section className="card">
        <h3>Field Operations</h3>
        <div className="steps">
          <p>Upload geo-tagged site evidence</p>
          <p>Update physical progress</p>
          <p>Submit inspection report</p>
          <p>Report site-level issues</p>
          <p>Verify latest project information</p>
        </div>
      </section>

      <section className="card">
        <h3>Today's Inspection Queue</h3>

        <Link className="list-row" href="/projects/MP-2026-003">
          <span>
            <b>Village Water Supply Project</b>
            <small>MP-2026-003 · Dindori</small>
          </span>
          <em className="tag delayed">Delayed</em>
        </Link>

        <Link className="list-row" href="/projects/MP-2026-006">
          <span>
            <b>Community Hall</b>
            <small>MP-2026-006 · Dindori</small>
          </span>
          <em className="tag delayed">Delayed</em>
        </Link>

        <Link className="list-row" href="/projects/MP-2026-005">
          <span>
            <b>School Building</b>
            <small>MP-2026-005 · Dindori</small>
          </span>
          <em className="tag on-track">On Track</em>
        </Link>
      </section>
    </div>

    <section className="card">
      <h3>Priority Actions</h3>
      <div className="steps">
        <p>Review delayed project evidence</p>
        <p>Verify latest field updates</p>
        <p>Compare expenditure with physical progress</p>
        <p>Record authorized decision</p>
      </div>
    </section>
  </>
}

function Settings(){
  return <>
    <div className="page-head">
      <div>
        <span className="eyebrow">SYSTEM CONFIGURATION</span>
        <h2>Settings</h2>
        <p>Configure monitoring thresholds, AI guardrails and notification preferences.</p>
      </div>
    </div>

    <div className="grid-2">
      <section className="card">
        <h3>Monitoring Thresholds</h3>
        <div className="info-row"><span>Risk alert threshold</span><b>75 / 100</b></div>
        <div className="info-row"><span>Stale update threshold</span><b>14 days</b></div>
        <div className="info-row"><span>Fund-progress mismatch</span><b>25%</b></div>
        <div className="info-row"><span>Schedule variance alert</span><b>50%</b></div>
      </section>

      <section className="card">
        <h3>Sentinel AI Guardrails</h3>
        <div className="steps">
          <p>Enabled · Human review for Critical alerts</p>
          <p>Enabled · Evidence required before escalation</p>
          <p>Enabled · AI recommendations require authorization</p>
          <p>Enabled · Fraud is never automatically declared</p>
          <p>Enabled · Complete audit trail</p>
        </div>
      </section>

      <section className="card">
        <h3>Notifications</h3>
        <div className="info-row"><span>Critical risk alerts</span><b>ON</b></div>
        <div className="info-row"><span>Delayed project alerts</span><b>ON</b></div>
        <div className="info-row"><span>Field update reminders</span><b>ON</b></div>
        <div className="info-row"><span>Weekly monitoring summary</span><b>ON</b></div>
      </section>

      <section className="card">
        <h3>Data & Privacy</h3>
        <div className="info-row"><span>Geo-location collection</span><b>Enabled</b></div>
        <div className="info-row"><span>Citizen evidence moderation</span><b>Enabled</b></div>
        <div className="info-row"><span>Audit logging</span><b>Enabled</b></div>
        <div className="info-row"><span>AI decision authority</span><b>Human Only</b></div>
      </section>
    </div>
  </>
}

function Citizen(){return <><div className="page-head"><div><span className="eyebrow">PUBLIC TRANSPARENCY</span><h2>Citizen project portal</h2><p>Explore monitored development works and report observations.</p></div></div><section className="card">{projects.slice(0,8).map(p=><Link className="list-row" key={p.id} href={`/projects/${p.id}`}><span><b>{p.name}</b><small>{p.district} Â· {p.progress}% complete</small></span><strong>\u20B9{(p.budget/1e5).toFixed(0)}L</strong><em className={`tag ${p.status.toLowerCase().replace(" ","-")}`}>{p.status}</em></Link>)}</section></>}
function Login(){return <div className="login-card"><div className="brand"><div className="brand-mark">S</div><div><b>MPLAD Sentinel AI</b><span>SECURE DEMO</span></div></div><h2>Sign in</h2><p>Prototype authentication for SIH presentation.</p><label>Email<input defaultValue="demo@mplads-sentinel.gov.in"/></label><label>Password<input type="password" defaultValue="sentinel-demo"/></label><Link className="primary full" href="/dashboard">Continue to Command Center â†’</Link></div>}