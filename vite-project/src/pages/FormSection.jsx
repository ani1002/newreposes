import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FormSection = ({ formData, errors, onInputChange }) => {
  const fields = [
   
    { id: 'Name', label: 'Name', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'phone', label: 'Phone', type: 'text' },
    { id: 'age', label: 'Age', type: 'text' },
    { id: 'address', label: 'Address', type: 'text' },
    // { id: 'Refferaldoctor', label: 'Referral Doctor', type: 'text' },
    { id: 'bookingdate', label: 'Booking Date', type: 'Date' },
    { id: 'bookingtime', label: 'Booking Time', type: 'time' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input
            id={field.id}
            name={field.id}
            type={field.type}
            value={formData[field.id]}
            onChange={onInputChange}
            className={errors[field.id] ? 'border-red-500' : ''}
          />
          {errors[field.id] && <p className="text-red-500 text-sm">{errors[field.id]}</p>}
        </div>
      ))}
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select
          name="gender"
          onValueChange={(value) => onInputChange({ target: { name: 'gender', value } })}
        >
          <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
            <SelectValue placeholder={formData.gender?formData.gender:"Select Gender" } />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
      </div>
    </div>
  );
};

export default FormSection;
