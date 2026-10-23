import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Camera, CheckCircle, ArrowLeft, Users, HardHat } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PPEScanner = () => {
  const navigate = useNavigate();
  const FLASK_URL = "http://127.0.0.1:5000";
  
  const [summary, setSummary] = useState({ total: 0, wearing_ppe: 0, not_wearing_ppe: 0 });

  // Fetch live detection summary
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${FLASK_URL}/detection_summary`);
        if (response.ok) {
          const data = await response.json();
          setSummary(data);
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const startDetection = () => {
    window.open(FLASK_URL, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/features")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Features
          </Button>
        </div>

        {/* Main Card */}
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Camera className="h-8 w-8 text-construction-orange" />
              PPE Detection Scanner
            </CardTitle>
          </CardHeader>
          <CardContent className="py-10">
            <div className="w-32 h-32 bg-construction-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-16 w-16 text-construction-orange" />
            </div>

            <h2 className="text-2xl font-semibold mb-4">Ready to Launch PPE Detection</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Click below to open the live PPE detection window. You can monitor real-time stats here.
            </p>

            <Button
              onClick={startDetection}
              size="lg"
              className="bg-construction-orange hover:bg-construction-orange/90 text-lg px-8 py-3"
            >
              <Camera className="h-6 w-6 mr-3" />
              Launch PPE Scanner
            </Button>

            <p className="text-sm text-muted-foreground mt-4">Opens: {FLASK_URL}</p>
            <div className="mt-6 flex justify-center">
              <Button onClick={() => navigate("/ppe-images")} className="bg-red-500 text-white">
                Show Captured Images
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Summary */}
        <Card className="max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Users className="h-5 w-5 text-blue-500" />
              Live Detection Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">{summary.total}</p>
              <p>Total People</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">{summary.wearing_ppe}</p>
              <p>Wearing PPE</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-600">{summary.not_wearing_ppe}</p>
              <p>Not Wearing PPE</p>
            </div>
          </CardContent>
        </Card>

        {/* PPE Requirements */}
        <Card className="max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Required PPE Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center gap-2">
                <HardHat className="h-4 w-4 text-green-500" />
                <span>Hard Hat</span>
                <Badge variant="secondary">Required</Badge>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Safety Vest</span>
                <Badge variant="secondary">Required</Badge>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Mask / Goggles</span>
                <Badge variant="secondary">Required</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PPEScanner;

