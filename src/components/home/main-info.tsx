import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function MainInfo() {
  return (
    <div className="grid grid-cols-4 gap-3 w-[100%]">
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Name</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">Eventory</p>
        </CardContent>
      </Card>
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">₹ 40,00,000</p>
        </CardContent>
      </Card>
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">96%</p>
        </CardContent>
      </Card>
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Spaces</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">3</p>
        </CardContent>
      </Card>
    </div>
  );
}
