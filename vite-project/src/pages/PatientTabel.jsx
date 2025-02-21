import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search } from 'lucide-react';

export default function PatientTable3() {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortType, setSortType] = useState('name');

  const data = [
    {
      name: "John Doe",
      phone: "123-456-7890",
      address: "123 Main St, City",
      billNo: "B001",
      billDate: "2024-01-22",
      reportsApproved: 3,
      reportsPending: 1
    },
    {
      name: "Jane Smith",
      phone: "987-654-3210",
      address: "456 Elm St, Town",
      billNo: "B002",
      billDate: "2024-01-23",
      reportsApproved: 2,
      reportsPending: 2
    },
    {
      name: "Mike Johnson",
      phone: "456-789-0123",
      address: "789 Oak St, Village",
      billNo: "B003",
      billDate: "2024-01-24",
      reportsApproved: 4,
      reportsPending: 0
    }
  ];

  // Filtering and sorting logic
  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDateRange = 
      (!startDate || item.billDate >= startDate) &&
      (!endDate || item.billDate <= endDate);
    
    return matchesSearch && matchesDateRange;
  });

  // Sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    switch(sortType) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'billNo':
        return a.billNo.localeCompare(b.billNo);
      case 'billDate':
        return new Date(a.billDate) - new Date(b.billDate);
      case 'reportsApproved':
        return b.reportsApproved - a.reportsApproved;
      default:
        return 0;
    }
  });

  return (
    <Card className="w-full">
      <CardHeader className="bg-indigo-50">
        <CardTitle className="text-xl text-indigo-900">Patient Records</CardTitle>
        
        {/* Search and Date Range Section */}
        <div className="flex flex-wrap gap-4 mt-4">
          {/* Search Input */}
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search by name, bill number, or phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          {/* Date Range Inputs */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="startDate" className="text-indigo-900">Start Date</Label>
            <Input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="endDate" className="text-indigo-900">End Date</Label>
            <Input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-40"
            />
          </div>

          {/* Sorting Dropdown */}
          <div className="flex flex-col gap-2">
            <Label className="text-indigo-900">Sort By</Label>
            <select 
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="name">Name</option>
              <option value="billNo">Bill Number</option>
              <option value="billDate">Bill Date</option>
              <option value="reportsApproved">Reports Approved</option>
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-indigo-100">
              <TableRow>
                <TableHead className="text-indigo-900">Patient Name</TableHead>
                <TableHead className="text-indigo-900">Phone</TableHead>
                <TableHead className="text-indigo-900">Address</TableHead>
                <TableHead className="text-indigo-900">Bill No</TableHead>
                <TableHead className="text-indigo-900">Bill Date</TableHead>
                <TableHead className="text-indigo-900">Reports Approved</TableHead>
                <TableHead className="text-indigo-900">Reports Pending</TableHead>
                <TableHead className="text-indigo-900">Download Bill</TableHead>
                <TableHead className="text-indigo-900">Download Report</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row, i) => (
                <TableRow key={i} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.billNo}</TableCell>
                  <TableCell>{row.billDate}</TableCell>
                  <TableCell>{row.reportsApproved}</TableCell>
                  <TableCell>{row.reportsPending}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}