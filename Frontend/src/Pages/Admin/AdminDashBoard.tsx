import { useEffect, useState, type ChangeEvent } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Star } from "lucide-react";

import { adminSectionData } from "@/Utils/AdminSection";

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/store/store";

import { getDashboardActivity, getDashboardStats } from "@/API/apiAdminThunks";

const chartData = [
  {
    date: "Aug 18",
    contacts: 2,
    feedbacks: 1,
  },
  {
    date: "Aug 19",
    contacts: 4,
    feedbacks: 2,
  },
  {
    date: "Aug 20",
    contacts: 3,
    feedbacks: 3,
  },
  {
    date: "Aug 21",
    contacts: 6,
    feedbacks: 2,
  },
  {
    date: "Aug 22",
    contacts: 5,
    feedbacks: 4,
  },
  {
    date: "Aug 23",
    contacts: 7,
    feedbacks: 3,
  },
  {
    date: "Today",
    contacts: 4,
    feedbacks: 5,
  },
];

const AdminDashBoard = () => {
  const [selectedRange, setSelectedRange] = useState<7 | 30 | 90 | "all">(7);

  const {
    header,
    cards,
    footer: dashboardFooter,
  } = adminSectionData.adminDashboard;

  const { charts, right, footer } = dashboardFooter;

  const dispatch = useDispatch<AppDispatch>();

  const {
    dashboardStats,
    dashboardLoading,
    dashboardActivity,
    activityLoading,
  } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDashboardActivity(selectedRange));
  }, [dispatch, selectedRange]);

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setSelectedRange(value === "all" ? "all" : (Number(value) as 7 | 30 | 90));
  };

  /* -------------------------------------------------------------------------- */
  /*                            DASHBOARD CARD VALUES                           */
  /* -------------------------------------------------------------------------- */

  const cardValues: Record<number, number> = {
    1: dashboardStats?.contacts.total ?? 0,
    2: dashboardStats?.contacts.pending ?? 0,
    3: dashboardStats?.contacts.approved ?? 0,
    4: dashboardStats?.feedbacks.total ?? 0,
    5: dashboardStats?.feedbacks.pending ?? 0,
    6: dashboardStats?.feedbacks.featured ?? 0,
  };

  /* -------------------------------------------------------------------------- */
  /*                              ADDITIONAL STATS                              */
  /* -------------------------------------------------------------------------- */

  const approvalRate = dashboardStats?.contacts.approvalRate ?? 0;

  const averageRating = dashboardStats?.feedbacks.averageRating ?? 0;

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* ================= Page Heading ================= */}

      <div>
        <h1 className="mb-1 text-2xl font-bold text-white">{header.title}</h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#AAA3C2]">{header.description}</p>

          <div className="flex items-center gap-2">
            <span className="inline-block size-2 animate-pulse rounded-full bg-emerald-400" />

            <p className="text-xs text-[#AAA3C2]">{header.text}</p>
          </div>
        </div>
      </div>

      {/* ================= Cards ================= */}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(
          ({
            id,
            cardColor,
            borderColor,
            icon: Icon,
            iconColor,
            contentType,
          }) => {
            const submission = cardValues[id] ?? 0;

            return (
              <div
                key={id}
                className="flex items-center gap-5 rounded-2xl border p-6"
                style={{
                  background: cardColor,
                  borderColor,
                }}
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/5">
                  <Icon
                    size={22}
                    style={{
                      color: iconColor,
                    }}
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">
                    {dashboardLoading ? "..." : submission}
                  </span>

                  <span className="text-sm font-medium text-[#AAA3C2]">
                    {contentType}
                  </span>
                </div>
              </div>
            );
          },
        )}
      </div>

      {/* ================= Main Dashboard ================= */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_1fr]">
        {/* ================= Submission Activity ================= */}

        <section className="min-w-0 rounded-2xl border border-white/8 bg-[#110D25] p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-white">
                {charts.title}
              </h2>

              <p className="mt-1 text-xs text-[#AAA3C2]">
                {charts.description}
              </p>
            </div>

            <select
              value={selectedRange}
              onChange={handleOnChange}
              className="cursor-pointer rounded-xl border border-white/10 bg-[#1A1235] px-3 py-2 text-xs font-medium text-white outline-none transition focus:border-violet-500"
            >
              {charts.dateRange.map(({ id, date, text }) => (
                <option key={id} value={date ?? 0}>
                  {text}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-8 h-67.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                // data={dashboardStats?.activity ?? []}
                data={dashboardActivity}
                margin={{
                  top: 10,
                  right: 0,
                  left: -25,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="contactsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8E52EF" stopOpacity={0.35} />

                    <stop offset="100%" stopColor="#8E52EF" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient
                    id="feedbackGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#67D7EE" stopOpacity={0.28} />

                    <stop offset="100%" stopColor="#67D7EE" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  stroke="rgba(255,255,255,0.06)"
                />

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#817A9E",
                    fontSize: 12,
                  }}
                />

                <YAxis hide domain={[0, "dataMax + 1"]} />

                <Tooltip
                  contentStyle={{
                    background: "#1A1531",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                  labelStyle={{
                    color: "#ffffff",
                  }}
                  itemStyle={{
                    color: "#AAA3C2",
                  }}
                />

                <Area
                  type="linear"
                  dataKey="contacts"
                  stroke="#A78BFA"
                  strokeWidth={3}
                  fill="url(#contactsGradient)"
                />

                <Area
                  type="linear"
                  dataKey="feedbacks"
                  stroke="#67D7EE"
                  strokeWidth={3}
                  fill="url(#feedbackGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center gap-6">
            {charts.contents.map(({ id, circleColor, text }) => (
              <div key={id} className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{
                    backgroundColor: circleColor,
                  }}
                />

                <span className="text-xs text-[#AAA3C2]">{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= Needs Attention ================= */}

        <section className="rounded-2xl border border-white/8 bg-[#110D25] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                {right.title}
              </h2>

              <p className="mt-1 text-xs text-[#AAA3C2]">{right.description}</p>
            </div>

            <right.icon size={18} className="text-yellow-400" />
          </div>

          <div className="mt-5 space-y-3">
            {right.content.map(({ id, title, description, icon: Icon }) => {
              const submission = title.toLowerCase().includes("contact")
                ? (dashboardStats?.contacts.pending ?? 0)
                : (dashboardStats?.feedbacks.pending ?? 0);

              return (
                <div
                  key={id}
                  className="rounded-2xl border border-orange-400/20 bg-orange-400/6 px-5 py-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">
                      {title}
                    </h3>

                    {/* Same color as Needs Attention icon */}
                    <span className="-mb-2 text-lg font-bold text-yellow-400">
                      {dashboardLoading ? "..." : submission}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#AAA3C2]">
                    <span>{description}</span>

                    <Icon size={14} className="shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= Bottom Stats ================= */}

          <div className="mt-5 grid grid-cols-2 border-t border-white/8 pt-5">
            {/* Approval Rate */}

            <div>
              <p className="text-xl font-bold text-white">
                {dashboardLoading ? "..." : `${approvalRate}%`}
              </p>

              <p className="mt-1 text-xs text-[#AAA3C2]">
                {right.approvalRate.title}
              </p>
            </div>

            {/* Average Rating */}

            <div>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-white">
                  {dashboardLoading ? "..." : averageRating}
                </p>

                {!dashboardLoading && (
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                )}
              </div>

              <p className="mt-1 text-xs text-[#AAA3C2]">Average Rating</p>
            </div>
          </div>
        </section>
      </div>

      {/* ================= Recent Activity ================= */}

      <section className="mt-5 rounded-2xl border border-white/8 bg-[#110D25] px-5 py-7 sm:px-7 sm:py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              {footer.title}
            </h2>

            <p className="mt-1 text-xs text-[#AAA3C2]">{footer.description}</p>
          </div>

          <span className="text-xs font-medium text-[#8E52EF]">
            {footer.text}
          </span>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
          {footer.content.map(
            ({
              id,
              icon: Icon,
              boxColor,
              iconColor,
              title,
              description,
              date,
            }) => (
              <div key={id} className="flex items-start gap-3">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-2xl ${boxColor}`}
                >
                  <Icon size={16} className={iconColor} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-white">
                    {title}
                  </h3>

                  <p className="mt-1 text-xs text-[#AAA3C2]">
                    {description}
                    {date && ` · ${date}`}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashBoard;
