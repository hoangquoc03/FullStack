import Header from "../components/Header.jsx";
import AddTask from "../components/AddTask.jsx";
import StatsAndFilters from "../components/StatsAndFilters.jsx";
import TaskList from "../components/TaskList.jsx";
import TaskListPagination from "../components/TaskListPagination.jsx";
import Footer from "../components/Footer.jsx";
import DateTimeFilter from "@/components/DateTimeFilter";
import { useState } from "react";

export default function HomePage() {
  const [taskBuffer, setTaskBuffer] = useState([]);
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] relative">
      {/* Soft Morning Mist Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(135deg, 
          rgba(248,250,252,1) 0%, 
          rgba(219,234,254,0.7) 30%, 
          rgba(165,180,252,0.5) 60%, 
          rgba(129,140,248,0.6) 100%
        ),
        radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(199,210,254,0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(224,231,255,0.3) 0%, transparent 60%)
      `,
        }}
      />
      <div className="container pt-8 mx-auto relative z-10">
        <div className="ư-full max-w-2xl p-6 mx-auto space-y-6">
          <Header />
          <AddTask />
          <StatsAndFilters />
          <TaskList />
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
