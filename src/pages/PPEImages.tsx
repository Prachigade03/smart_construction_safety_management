import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FLASK_URL = "http://127.0.0.1:5000";

const PPEImages = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchImgs = async () => {
      try {
        const res = await fetch(`${FLASK_URL}/get_captured_images`);
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setImages(data.images || []);
      } catch (e) {}
    };
    fetchImgs();
    const id = setInterval(fetchImgs, 3000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <Button variant="outline" onClick={() => navigate("/ppe-scanner")}> <ArrowLeft /> Back</Button>
        <Card className="mt-4">
          <CardHeader><CardTitle>Captured PPE Violations</CardTitle></CardHeader>
          <CardContent>
            {images.length === 0 ? (
              <p>No captured images yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((f) => (
                  <div key={f} className="border rounded overflow-hidden">
                    <img src={`${FLASK_URL}/captured_images/${f}`} alt={f} className="w-full h-48 object-cover" />
                    <div className="p-2 text-sm">{f}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PPEImages;


