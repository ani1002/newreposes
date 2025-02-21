import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HealthPackageCard = ({ title, includes, homeCollection, labVisit, price }) => {
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-80">
      <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <CardContent className="p-6">
        <p className="text-gray-600 mb-4">Includes: {includes} Parameters</p>
        <div className="flex items-center mb-4">
          {homeCollection && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full mr-2">
              Home Collection
            </span>
          )}
          {labVisit && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Lab Visit
            </span>
          )}
        </div>
        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-full px-6 py-3">
          Know More
        </Button>
      </CardContent>
      <CardFooter className="p-6">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-bold text-indigo-500">$ {price}</p>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-full px-6 py-3">
            Buy Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const HealthPackagesUI = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <HealthPackageCard
        title="(HbA1C) Glycosylated Haemoglobin"
        includes={1}
        homeCollection
        labVisit
        price={75}
      />
      <HealthPackageCard
        title="Potassium"
        includes={1}
        homeCollection
        labVisit
        price={45}
      />
      <HealthPackageCard
        title="(FBS) Glucose Fasting"
        includes={1}
        homeCollection
        labVisit
        price={55}
      />
      <HealthPackageCard
        title="(PP) Glucose Post Prandial"
        includes={1}
        homeCollection
        labVisit
        price={60}
      />
      <HealthPackageCard
        title="Hb Electrophoresis Premium"
        includes={1}
        homeCollection
        labVisit
        price={90}
      />
      <HealthPackageCard
        title="(HLA-B27) Human Leukocyte Antigen"
        includes={1}
        homeCollection
        labVisit
        price={100}
      />
    </div>
  );
};

export default HealthPackagesUI;