import { adminSectionData } from "@/Utils/AdminSection";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  MoreVertical,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const header = adminSectionData.adminContacts.header;
const status = adminSectionData.adminContacts.status;
const order = adminSectionData.adminContacts.order;
const tableHeader = adminSectionData.adminContacts.content.header;
const contactsData = adminSectionData.adminContacts.content.body;

const AdminContacts = () => {
  const [selectedStatusRange, setSelectedStatusRange] = useState("All Status");
  const [selectedOrderRange, setSelectedOrderRange] = useState("Latest First");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Default is false: show pill buttons. Only toggles dropdown per-row when activated from header 3-dots
  const [showSelectMode, setShowSelectMode] = useState(false);
  const [openHeaderMenu, setOpenHeaderMenu] = useState(false);
  const [openRowSelectId, setOpenRowSelectId] = useState<number | null>(null);

  const headerMenuRef = useRef<HTMLDivElement | null>(null);
  const rowSelectRef = useRef<HTMLDivElement | null>(null);

  const HeaderIcon = header.right.icon;

  const [selectedContactStatus, setSelectedContactStatus] = useState<
    Record<number, string>
  >(() =>
    contactsData.reduce(
      (acc, contact) => {
        acc[contact.id] = contact.selectedStatus.status;
        return acc;
      },
      {} as Record<number, string>,
    ),
  );

  const handleRefresh = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    // Replace this with actual refetch logic later
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const handleStatusChange = (contactId: number, newStatus: string) => {
    setSelectedContactStatus((previous) => ({
      ...previous,
      [contactId]: newStatus,
    }));
    setOpenRowSelectId(null);
  };

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      console.error("Unable to copy email");
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerMenuRef.current &&
        !headerMenuRef.current.contains(event.target as Node)
      ) {
        setOpenHeaderMenu(false);
      }
      if (
        rowSelectRef.current &&
        !rowSelectRef.current.contains(event.target as Node)
      ) {
        setOpenRowSelectId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menus on Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenHeaderMenu(false);
        setOpenRowSelectId(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const getStatusStyles = (currentStatus: string) => {
    switch (currentStatus.toLowerCase()) {
      case "approved":
        return {
          wrapper: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
          icon: "text-emerald-400",
        };

      case "rejected":
        return {
          wrapper: "border-red-500/25 bg-red-500/10 text-red-400",
          icon: "text-red-400",
        };

      default:
        return {
          wrapper: "border-yellow-500/25 bg-yellow-500/10 text-yellow-400",
          icon: "text-yellow-400",
        };
    }
  };

  // Only returns the other 2 available statuses based on the active one
  const getActionOptions = (currentStatus: string) => {
    switch (currentStatus.toLowerCase()) {
      case "approved":
        return [
          {
            status: "Pending",
            icon: Clock,
            style:
              "border-yellow-500/20 bg-yellow-500/5 text-yellow-400 hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:text-yellow-300",
          },
          {
            status: "Rejected",
            icon: X,
            style:
              "border-red-500/20 bg-red-500/5 text-red-400 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300",
          },
        ];

      case "rejected":
        return [
          {
            status: "Approved",
            icon: Check,
            style:
              "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300",
          },
          {
            status: "Pending",
            icon: Clock,
            style:
              "border-yellow-500/20 bg-yellow-500/5 text-yellow-400 hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:text-yellow-300",
          },
        ];

      default: // Pending
        return [
          {
            status: "Approved",
            icon: Check,
            style:
              "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300",
          },
          {
            status: "Rejected",
            icon: X,
            style:
              "border-red-500/20 bg-red-500/5 text-red-400 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300",
          },
        ];
    }
  };

  const filteredContacts = contactsData
    .filter((contact) => {
      const search = searchQuery.toLowerCase();

      const matchesSearch =
        contact.name.toLowerCase().includes(search) ||
        contact.email.toLowerCase().includes(search) ||
        contact.project.toLowerCase().includes(search);

      const currentStatus =
        selectedContactStatus[contact.id] ?? contact.selectedStatus.status;

      const matchesStatus =
        selectedStatusRange === "All Status" ||
        currentStatus === selectedStatusRange;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (selectedOrderRange === "Oldest First") {
        return a.id - b.id;
      }

      return b.id - a.id;
    });

  return (
    <div className="mx-auto flex h-full w-full flex-col overflow-hidden">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white">{header.title}</h1>

          <p className="text-sm text-[#AAA3C2]">{header.description}</p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex w-fit items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-[#AAA3C2] transition-all hover:border-purple-400/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          <HeaderIcon
            size={15}
            className={isRefreshing ? "animate-spin" : ""}
          />

          <span className="text-sm font-medium">{header.right.title}</span>
        </button>
      </div>

      {/* ================= FILTERS ================= */}

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}

        <div className="relative min-w-0 flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(253_20%_70%)]"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search name, email or project..."
            className="w-full rounded-3xl border border-white/10 bg-[#1A1235] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-[hsl(253_20%_70%)]/60 focus:border-violet-500/60"
          />
        </div>

        {/* Status + Order */}

        <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
          <select
            value={selectedStatusRange}
            onChange={(event) => setSelectedStatusRange(event.target.value)}
            className="w-full cursor-pointer rounded-3xl border border-white/10 bg-[#1A1235] px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-violet-500 sm:w-40"
          >
            {status.map(({ id, title }) => (
              <option key={id} value={title}>
                {title}
              </option>
            ))}
          </select>

          <select
            value={selectedOrderRange}
            onChange={(event) => setSelectedOrderRange(event.target.value)}
            className="w-full cursor-pointer rounded-3xl border border-white/10 bg-[#1A1235] px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-violet-500 sm:w-40"
          >
            {order.map(({ id, title }) => (
              <option key={id} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#17132A]">
        {/* Scroll works, scrollbar remains hidden */}

        <div
          className="overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <table className="w-full table-fixed border-collapse">
            {/* TABLE HEADER */}

            <thead>
              <tr className="border-b border-white/10">
                <th className="w-14 px-5 py-4 text-left">
                  <input
                    type="checkbox"
                    className="h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/20 bg-transparent transition checked:border-violet-500 checked:bg-violet-500"
                  />
                </th>

                {tableHeader.map((item) => (
                  <th
                    key={item.id}
                    className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold tracking-wider text-[#AAA3C2]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{item.title}</span>

                      {item.title.toLowerCase().includes("change status") && (
                        <div className="relative" ref={headerMenuRef}>
                          <button
                            type="button"
                            onClick={() => setOpenHeaderMenu((prev) => !prev)}
                            className="flex h-5 w-5 items-center justify-center rounded text-[#AAA3C2] transition hover:bg-white/10 hover:text-white"
                            aria-label="Change status view"
                          >
                            <MoreVertical size={14} />
                          </button>

                          {openHeaderMenu && (
                            <div className="absolute right-0 top-6 z-50 w-44 rounded-xl border border-white/10 bg-[#211A38] p-1.5 shadow-xl">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowSelectMode((prev) => !prev);
                                  setOpenHeaderMenu(false);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-white transition hover:bg-violet-500/20 hover:text-violet-300"
                              >
                                {showSelectMode
                                  ? "Show Action Buttons"
                                  : "Show Select Dropdown"}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* TABLE BODY */}

            <tbody>
              {filteredContacts.map((contact) => {
                const currentStatus =
                  selectedContactStatus[contact.id] ??
                  contact.selectedStatus.status;

                const statusStyle = getStatusStyles(currentStatus);
                const actionOptions = getActionOptions(currentStatus);

                const CurrentStatusIcon =
                  currentStatus === "Approved"
                    ? Check
                    : currentStatus === "Rejected"
                      ? X
                      : contact.selectedStatus.icon;

                return (
                  <tr
                    key={contact.id}
                    className="border-b border-white/[0.07] transition-colors last:border-b-0 hover:bg-white/[0.02]"
                  >
                    {/* Checkbox */}
                    {/* 
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        className="h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/20 bg-transparent transition checked:border-violet-500 checked:bg-violet-500"
                      />
                    </td> */}

                    {/* Name / Email */}

                    <td className="min-w-52.5 px-4 py-4">
                      <p className="font-semibold text-white">{contact.name}</p>

                      <button
                        type="button"
                        onClick={() => copyEmail(contact.email)}
                        className="group mt-1 flex items-center gap-1 text-left text-xs text-[#AAA3C2] transition hover:text-violet-300"
                      >
                        <span>{contact.email}</span>

                        <Copy
                          size={12}
                          className="opacity-70 transition group-hover:opacity-100"
                        />
                      </button>
                    </td>

                    {/* Project */}

                    <td className="min-w-[160px] px-4 py-4 text-sm text-[#B8B1CD]">
                      {contact.project}
                    </td>

                    {/* Budget */}

                    <td className="min-w-[150px] px-4 py-4 text-sm text-[#B8B1CD]">
                      ${contact.budget.toLocaleString()}
                    </td>

                    {/* Message */}

                    <td className="max-w-[220px] px-4 py-4">
                      <p className="truncate text-sm text-[#B8B1CD]">
                        {contact.message}
                      </p>
                    </td>

                    {/* Current Status */}

                    <td className="min-w-[150px] px-4 py-4">
                      <div
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyle.wrapper}`}
                      >
                        <CurrentStatusIcon
                          size={13}
                          className={statusStyle.icon}
                        />

                        <span>{currentStatus}</span>
                      </div>
                    </td>

                    {/* Date */}

                    <td className="min-w-[140px] whitespace-nowrap px-4 py-4 text-sm text-[#B8B1CD]">
                      {contact.date}
                    </td>

                    {/* Change Status */}

                    <td className="min-w-[220px] px-4 py-4">
                      {showSelectMode ? (
                        /* Only visible when toggled via header 3-dots */
                        <div
                          className="relative w-fit"
                          ref={
                            openRowSelectId === contact.id ? rowSelectRef : null
                          }
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenRowSelectId((prev) =>
                                prev === contact.id ? null : contact.id,
                              )
                            }
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1A1235] px-3.5 py-1.5 text-xs font-medium text-white transition hover:border-violet-400/40"
                          >
                            <span>{currentStatus}</span>
                            <ChevronDown size={14} className="text-[#AAA3C2]" />
                          </button>

                          {openRowSelectId === contact.id && (
                            <div className="absolute left-0 top-10 z-50 w-36 rounded-xl border border-white/10 bg-[#211A38] p-1.5 shadow-2xl shadow-black/50">
                              {contact.changeStatus?.map((option) => {
                                const OptionIcon = option.icon;
                                const isSelected =
                                  currentStatus === option.status;

                                return (
                                  <button
                                    key={option.id}
                                    type="button"
                                    onClick={() =>
                                      handleStatusChange(
                                        contact.id,
                                        option.status,
                                      )
                                    }
                                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition ${
                                      isSelected
                                        ? "bg-violet-500/20 text-white"
                                        : "text-[#B8B1CD] hover:bg-white/6 hover:text-white"
                                    }`}
                                  >
                                    <OptionIcon
                                      size={14}
                                      className={option.color}
                                    />
                                    <span>{option.status}</span>
                                    {isSelected && (
                                      <Check
                                        size={13}
                                        className="ml-auto text-violet-400"
                                      />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Direct Pill Action Buttons */
                        <div className="flex items-center gap-2.5">
                          {actionOptions.map((action) => {
                            const ActionIcon = action.icon;
                            return (
                              <button
                                key={action.status}
                                type="button"
                                onClick={() =>
                                  handleStatusChange(contact.id, action.status)
                                }
                                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition ${action.style}`}
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

              {/* Empty State */}

              {filteredContacts.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-14 text-center text-sm text-[#AAA3C2]"
                  >
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#AAA3C2]">
          Showing{" "}
          <span className="text-white">
            {filteredContacts.length === 0
              ? "0"
              : `1–${filteredContacts.length}`}
          </span>{" "}
          of <span className="text-white">{filteredContacts.length}</span>{" "}
          contacts
        </p>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          {/* Rows */}

          <div className="flex items-center gap-2">
            <span className="text-sm text-[#AAA3C2]">Rows</span>

            <button
              type="button"
              className="flex items-center gap-2 rounded-2xl border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-sm text-white transition hover:bg-violet-500/20"
            >
              10
              <ChevronDown size={14} className="text-[#AAA3C2]" />
            </button>
          </div>

          {/* Pagination */}

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 text-white/20"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="px-1 text-sm text-[#AAA3C2]">
              <span className="text-white">1</span> / 1
            </span>

            <button
              type="button"
              disabled
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 text-white/20"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;
