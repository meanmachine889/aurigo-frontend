import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function MainInfo() {
  return (
    <div className="grid grid-cols-3 gap-2 w-[100%]">
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Area</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">Kitchen</p>
        </CardContent>
      </Card>
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Expenditure</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">₹ 40,000</p>
        </CardContent>
      </Card>
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">3</p>
        </CardContent>
      </Card>
    </div>
  );
}
