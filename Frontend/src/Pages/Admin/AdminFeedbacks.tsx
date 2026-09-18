import { adminSectionData } from "@/Utils/AdminSection";
import {
  CheckCircle2,
  CircleX,
  Clock3,
  ChevronDown,
  MoreVertical,
  Search,
  Star,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const header = adminSectionData.adminFeedbacks.header;
const filters = adminSectionData.adminFeedbacks.filters;
const tableHeader = adminSectionData.adminFeedbacks.content.header;
const feedbackData = adminSectionData.adminFeedbacks.content.body;

const HeaderIcon = header.right.icon;

const AdminFeedbacks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedFeatured, setSelectedFeatured] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Latest First");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Only enabled from the 3 dots inside the Actions heading
  const [showSelectMode, setShowSelectMode] = useState(false);
  const [openHeaderMenu, setOpenHeaderMenu] = useState(false);

  const headerMenuRef = useRef<HTMLDivElement | null>(null);

  const [feedbackStatuses, setFeedbackStatuses] = useState<
    Record<number, string>
  >(() =>
    feedbackData.reduce(
      (acc, feedback) => {
        acc[feedback.id] = feedback.status.status;
        return acc;
      },
      {} as Record<number, string>,
    ),
  );

  const [featuredFeedbacks, setFeaturedFeedbacks] = useState<
    Record<number, boolean>
  >(() =>
    feedbackData.reduce(
      (acc, feedback) => {
        acc[feedback.id] = feedback.featured;
        return acc;
      },
      {} as Record<number, boolean>,
    ),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerMenuRef.current &&
        !headerMenuRef.current.contains(event.target as Node)
      ) {
        setOpenHeaderMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRefresh = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const handleStatusChange = (feedbackId: number, status: string) => {
    setFeedbackStatuses((previous) => ({
      ...previous,
      [feedbackId]: status,
    }));
  };

  const toggleFeatured = (feedbackId: number) => {
    setFeaturedFeedbacks((previous) => ({
      ...previous,
      [feedbackId]: !previous[feedbackId],
    }));
  };

  const getStatusStyles = (currentStatus: string) => {
    switch (currentStatus.toLowerCase()) {
      case "approved":
        return {
          wrapper: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
        };

      case "rejected":
        return {
          wrapper: "border-red-400/30 bg-red-500/10 text-red-300",
        };

      default:
        return {
          wrapper: "border-yellow-400/30 bg-yellow-500/10 text-yellow-300",
        };
    }
  };

  const getStatusIcon = (currentStatus: string) => {
    switch (currentStatus.toLowerCase()) {
      case "approved":
        return CheckCircle2;

      case "rejected":
        return CircleX;

      default:
        return Clock3;
    }
  };

  const filteredFeedbacks = useMemo(() => {
    const feedbacks = feedbackData.filter((feedback) => {
      const currentStatus =
        feedbackStatuses[feedback.id] ?? feedback.status.status;

      const isFeatured = featuredFeedbacks[feedback.id] ?? feedback.featured;

      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        feedback.name.toLowerCase().includes(query) ||
        feedback.role.toLowerCase().includes(query) ||
        feedback.comment.toLowerCase().includes(query);

      const matchesStatus =
        selectedStatus === "All Status" || currentStatus === selectedStatus;

      const matchesFeatured =
        selectedFeatured === "All" ||
        (selectedFeatured === "Featured Only" && isFeatured) ||
        (selectedFeatured === "Not Featured" && !isFeatured);

      const matchesRating =
        selectedRating === null || feedback.rating >= selectedRating;

      return matchesSearch && matchesStatus && matchesFeatured && matchesRating;
    });

    return [...feedbacks].sort((a, b) => {
      if (selectedSort === "Oldest First") {
        return a.id - b.id;
      }

      return b.id - a.id;
    });
  }, [
    searchQuery,
    selectedStatus,
    selectedFeatured,
    selectedSort,
    selectedRating,
    feedbackStatuses,
    featuredFeedbacks,
  ]);

  const totalFeedbacks = feedbackData.length;

  const pendingFeedbacks = Object.values(feedbackStatuses).filter(
    (status) => status === "Pending",
  ).length;

  const approvedFeedbacks = Object.values(feedbackStatuses).filter(
    (status) => status === "Approved",
  ).length;

  const approvalRate =
    totalFeedbacks > 0
      ? Math.round((approvedFeedbacks / totalFeedbacks) * 100)
      : 0;

  const averageRating =
    totalFeedbacks > 0
      ? (
          feedbackData.reduce((total, feedback) => total + feedback.rating, 0) /
          totalFeedbacks
        ).toFixed(1)
      : "0.0";

  const featuredCount = Object.values(featuredFeedbacks).filter(Boolean).length;

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* ================= HEADER ================= */}

      <div>
        <h1 className="mb-1 text-2xl font-bold text-white">{header.title}</h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#AAA3C2]">{header.description}</p>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="group flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-[#AAA3C2] transition-all hover:border-purple-400/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            <HeaderIcon
              size={14}
              className={isRefreshing ? "animate-spin" : ""}
            />

            <span className="text-sm font-medium">{header.right.title}</span>
          </button>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          value={totalFeedbacks}
          label="Total feedback"
          color="text-white"
        />

        <StatCard
          value={pendingFeedbacks}
          label="Pending"
          color="text-yellow-400"
        />

        <StatCard
          value={`${approvalRate}%`}
          label="Approval rate"
          color="text-emerald-400"
        />

        <StatCard
          value={averageRating}
          label="Average rating"
          color="text-cyan-400"
        />

        <StatCard
          value={featuredCount}
          label="Featured"
          color="text-cyan-400"
        />
      </div>

      {/* ================= FILTERS ================= */}

      <div className="mt-7 flex flex-col gap-3 xl:flex-row xl:items-center">
        {/* SEARCH */}

        <div className="relative min-w-0 flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#AAA3C2]"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search testimonials..."
            className="w-full rounded-3xl border border-white/10 bg-[#211A38] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-[#AAA3C2]/70 focus:border-violet-500/60"
          />
        </div>

        {/* FILTERS */}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:flex">
          <FilterSelect
            value={selectedStatus}
            onChange={setSelectedStatus}
            options={filters.status.map((item) => item.title)}
          />

          <FilterSelect
            value={selectedFeatured}
            onChange={setSelectedFeatured}
            options={filters.featured.map((item) => item.title)}
          />

          <FilterSelect
            value={selectedSort}
            onChange={setSelectedSort}
            options={filters.sort.map((item) => item.title)}
          />

          <FilterSelect
            value={
              selectedRating === null
                ? "All ratings"
                : `${selectedRating} stars`
            }
            onChange={(value) => {
              if (value === "All ratings") {
                setSelectedRating(null);
                return;
              }

              setSelectedRating(Number(value.split(" ")[0]));
            }}
            options={filters.rating.map((item) => item.title)}
          />
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#17132A]">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-270 border-collapse">
            {/* ================= HEADER ================= */}

            <thead>
              <tr className="border-b border-white/10">
                {tableHeader.map((item) => (
                  <th
                    key={item.id}
                    className={`whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#AAA3C2]
                      ${item.title === "Name" ? "w-45" : ""}
                      ${item.title === "Role" ? "w-45" : ""}
                      ${item.title === "Rating" ? "w-26.25" : ""}
                      ${item.title === "Comment" ? "w-45" : ""}
                      ${item.title === "Status" ? "w-31.25" : ""}
                      ${item.title === "Featured" ? "w-31.25" : ""}
                      ${item.title === "Date" ? "w-27.5" : ""}
                      ${item.title === "Actions" ? "w-37.5" : ""}
                    `}
                  >
                    {item.title === "Actions" ? (
                      <div className="flex items-center gap-1">
                        <span>{item.title}</span>

                        <div ref={headerMenuRef} className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenHeaderMenu((previous) => !previous)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-md text-[#AAA3C2] transition hover:bg-white/10 hover:text-white"
                          >
                            <MoreVertical size={15} />
                          </button>

                          {openHeaderMenu && (
                            <div className="absolute right-0 top-8 z-50 w-48 rounded-xl border border-white/10 bg-[#211A38] p-1.5 shadow-2xl">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowSelectMode((previous) => !previous);

                                  setOpenHeaderMenu(false);
                                }}
                                className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-white transition hover:bg-white/10"
                              >
                                {showSelectMode
                                  ? "Show Action Buttons"
                                  : "Show Select Dropdown"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      item.title
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* ================= BODY ================= */}

            <tbody>
              {filteredFeedbacks.map((feedback) => {
                const currentStatus =
                  feedbackStatuses[feedback.id] ?? feedback.status.status;

                const isFeatured =
                  featuredFeedbacks[feedback.id] ?? feedback.featured;

                const statusStyle = getStatusStyles(currentStatus);

                const StatusIcon = getStatusIcon(currentStatus);

                return (
                  <tr
                    key={feedback.id}
                    className="border-b border-white/[0.07] transition-colors last:border-b-0 hover:bg-white/[0.02]"
                  >
                    {/* ================= NAME ================= */}

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        {feedback.image ? (
                          <img
                            src={feedback.image}
                            alt={feedback.name}
                            className="h-8 w-8 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 text-xs font-semibold text-white">
                            {feedback.initials}
                          </div>
                        )}

                        <p className="max-w-[125px] truncate whitespace-nowrap text-sm font-semibold text-white">
                          {feedback.name}
                        </p>
                      </div>
                    </td>

                    {/* ================= ROLE ================= */}

                    <td className="px-4 py-4">
                      <p className="max-w-[160px] truncate text-sm text-[#AAA3C2]">
                        {feedback.role}
                      </p>
                    </td>

                    {/* ================= RATING ================= */}

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-0.5">
                        {Array.from({
                          length: 5,
                        }).map((_, index) => (
                          <Star
                            key={index}
                            size={14}
                            className={
                              index < feedback.rating
                                ? "fill-cyan-400 text-cyan-400"
                                : "text-white/15"
                            }
                          />
                        ))}
                      </div>
                    </td>

                    {/* ================= COMMENT ================= */}

                    <td className="px-4 py-4">
                      <p className="max-w-[160px] truncate text-sm text-[#AAA3C2]">
                        {feedback.comment}
                      </p>
                    </td>

                    {/* ================= STATUS ================= */}

                    <td className="px-4 py-4">
                      <div
                        className={`inline-flex whitespace-nowrap items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyle.wrapper}`}
                      >
                        <StatusIcon size={13} />

                        <span>{currentStatus}</span>
                      </div>
                    </td>

                    {/* ================= FEATURED ================= */}

                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => toggleFeatured(feedback.id)}
                        className={`inline-flex whitespace-nowrap items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                          isFeatured
                            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                            : "border-white/10 bg-white/[0.02] text-[#AAA3C2] hover:border-cyan-400/30 hover:text-cyan-300"
                        }`}
                      >
                        <Star
                          size={13}
                          className={
                            isFeatured ? "fill-cyan-400 text-cyan-400" : ""
                          }
                        />

                        <span>{isFeatured ? "Featured" : "Feature"}</span>
                      </button>
                    </td>

                    {/* ================= DATE ================= */}

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-[#AAA3C2]">
                      {feedback.date}
                    </td>

                    {/* ================= ACTIONS ================= */}

                    <td className="px-4 py-4">
                      {showSelectMode ? (
                        <div className="relative w-[135px]">
                          <select
                            value={currentStatus}
                            onChange={(event) =>
                              handleStatusChange(
                                feedback.id,
                                event.target.value,
                              )
                            }
                            className="w-full appearance-none rounded-xl border border-white/10 bg-[#211A38] px-3 py-2 pr-9 text-xs font-medium text-white outline-none focus:border-violet-500"
                          >
                            <option>Pending</option>
                            <option>Approved</option>
                            <option>Rejected</option>
                          </select>

                          <ChevronDown
                            size={14}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#AAA3C2]"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          {feedback.changeStatus.map((action) => {
                            const ActionIcon = action.icon;

                            return (
                              <button
                                key={action.id}
                                type="button"
                                onClick={() =>
                                  handleStatusChange(feedback.id, action.status)
                                }
                                className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium transition hover:bg-white/[0.07] ${action.color}`}
                              >
                                <ActionIcon size={12} />

                                <span>{action.status}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredFeedbacks.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-14 text-center text-sm text-[#AAA3C2]"
                  >
                    No feedbacks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <div className="mt-5 text-center">
        <p className="text-sm text-[#AAA3C2]">
          <span className="text-white">{filteredFeedbacks.length}</span>{" "}
          feedbacks · Showing all statuses
        </p>
      </div>
    </div>
  );
};

export default AdminFeedbacks;

/* ================= STAT CARD ================= */

type StatCardProps = {
  value: string | number;
  label: string;
  color: string;
};

const StatCard = ({ value, label, color }: StatCardProps) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#17132A] p-4">
      <p className={`text-xl font-bold ${color}`}>{value}</p>

      <p className="mt-2 text-xs text-[#AAA3C2]">{label}</p>
    </div>
  );
};

/* ================= FILTER SELECT ================= */

type FilterSelectProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const FilterSelect = ({ value, options, onChange }: FilterSelectProps) => {
  return (
    <div className="relative min-w-32.5">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full cursor-pointer appearance-none rounded-3xl border border-white/10 bg-[#211A38] px-4 py-3 pr-10 text-sm font-medium text-white outline-none transition focus:border-violet-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#AAA3C2]"
      />
    </div>
  );
};
