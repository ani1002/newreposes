import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Download, FileText, ChevronDown, Loader2 } from "lucide-react";
import axios from 'axios';

export default function PatientTable6() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/last-ind`);
      setPatients(response.data);
    } catch (error) {
     // console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...patients];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [patients, sortConfig]);

  const filteredData = sortedData.filter(patient => {
    return patient.BILL_NO?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#1a1f35] to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Patient Records Dashboard
          </h1>
          <p className="text-slate-400 mt-2">Manage and track patient information</p>
        </div>

        {/* Filters Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-900/50 border-slate-600 text-slate-200 focus:border-purple-500"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
            </div>
            <div className="relative">
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-slate-900/50 border-slate-600 text-slate-200 focus:border-purple-500"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
            </div>
            <div className="relative">
              <Input
                placeholder="Search Bill No..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/50 border-slate-600 text-slate-200 focus:border-purple-500 pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="px-6 py-4 bg-slate-800/50 text-left text-sm font-medium text-slate-300">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort('NM')}>
                      Patient Name
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 bg-slate-800/50 text-left text-sm font-medium text-slate-300">Phone</th>
                  <th className="px-6 py-4 bg-slate-800/50 text-left text-sm font-medium text-slate-300">Address</th>
                  <th className="px-6 py-4 bg-slate-800/50 text-left text-sm font-medium text-slate-300">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort('BILL_NO')}>
                      Bill No
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 bg-slate-800/50 text-left text-sm font-medium text-slate-300">Date</th>
                  <th className="px-6 py-4 bg-slate-800/50 text-left text-sm font-medium text-slate-300">Services</th>
                  <th className="px-6 py-4 bg-slate-800/50 text-left text-sm font-medium text-slate-300">Status</th>
                  <th className="px-6 py-4 bg-slate-800/50 text-left text-sm font-medium text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-purple-500" />
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((patient, index) => (
                    <tr key={index} className="hover:bg-slate-700/20">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                        {patient.NM}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {patient.PH_NO}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {patient.ADDR}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {patient.BILL_NO}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {new Date(patient.ENT_DT).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="bg-indigo-900/30 text-indigo-400 px-2 py-1 rounded-full text-xs">
                          {patient.SERVICES}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded-full text-xs">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-slate-700/50 rounded-lg text-cyan-400 hover:text-cyan-300">
                            <Download className="h-5 w-5" />
                          </button>
                          <button className="p-1 hover:bg-slate-700/50 rounded-lg text-cyan-400 hover:text-cyan-300">
                            <FileText className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-slate-800/50 px-6 py-4 border-t border-slate-700/50 flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Showing {paginatedData.length} of {filteredData.length} results
            </span>
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
                <Button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 text-sm ${
                    currentPage === index + 1
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}