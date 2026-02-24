import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound(){
    
    return (
        <div className="max-w-4xl ">
              <Card className=" ">
            <CardHeader>
                <CardTitle>Not found page sir</CardTitle>
            </CardHeader>
            <CardContent>
                <Button variant={"destructive"}>GO BACK</Button>
            </CardContent>
        </Card>
        </div>
      
    )
}