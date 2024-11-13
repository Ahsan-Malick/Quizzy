import { useState, useRef } from 'react'
import { Button } from "./Button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent } from "./ui/card"
import { Rotate3D } from 'lucide-react'
import html2canvas from 'html2canvas'
import { Switch } from "./ui/switch"



// Convert mm to pixels (assuming 96 DPI)
const mmToPx = (mm: number) => Math.round(mm * 3.78)

export default function CardCasingWithPreciseDimensions() {
  const [cardName, setCardName] = useState('LIONEL MESSI')
  const [cardSet, setCardSet] = useState('THE GREATS')
  const [cardNumber, setCardNumber] = useState('114')
  const [cardYear, setCardYear] = useState('2023')
  const [cardGrade, setCardGrade] = useState('10')
  const [type1, setType1] = useState('57')
  const [type2, setType2] = useState('69')
  const [cardSerial, setCardSerial] = useState('SSS005')
  const [gradingCompany, setGradingCompany] = useState('ssint.')
  const [gradeName, setGradeName] = useState('EXQ-ECH')
  const [companyName, setCompanyName] = useState('FUTERA')
  const [frontImage, setFrontImage] = useState<string | null>(null)
  const [backImage, setBackImage] = useState<string | null>(null)
  const [showFront, setShowFront] = useState(true)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isFront: boolean) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (isFront) {
          setFrontImage(reader.result as string)
        } else {
          setBackImage(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current)
      const image = canvas.toDataURL("image/png")
      const link = document.createElement('a')
      link.href = image
      link.download = showFront ? 'card-front.png' : 'card-back.png'
      link.click()
    }
  }

  const casingWidth = mmToPx(80*1.5)
  const casingHeight = mmToPx(103.5*1.5)
  const labelWidth = mmToPx(65*1.65)
  const labelHeight = mmToPx(18*1.5)
  const cardWidth = mmToPx(60*1.65)
  const cardHeight = mmToPx(90*1.5)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ssint. Card Casing Mockup</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Card Details</h2>
          <div className="space-y-4">
          <div>
              <Label htmlFor="cardYear">Year</Label>
              <Input
                id="cardYear"
                value={cardYear}
                onChange={(e) => setCardYear(e.target.value)}
                placeholder="Enter year"
              />
            </div>
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <Label htmlFor="cardName">Name</Label>
              <Input
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            
            <div>
              <Label htmlFor="cardSet">Card Set</Label>
              <Input
                id="cardSet"
                value={cardSet}
                onChange={(e) => setCardSet(e.target.value)}
                placeholder="Enter card set"
              />
            </div>
            <div>
              <Label htmlFor="type1">Type 1</Label>
              <Input
                id="type1"
                value={type1}
                onChange={(e) => setType1(e.target.value)}
                placeholder="Enter subset"
              />
            </div>
            <div>
              <Label htmlFor="type2">Type 2</Label>
              <Input
                id="type2"
                value={type2}
                onChange={(e) => setType2(e.target.value)}
                placeholder="Enter subset"
              />
            </div>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter card number"
              />
            </div>
            <div>
              <Label htmlFor="gradenname">Grade Name</Label>
              <Input
                id="gradenname"
                value={gradeName}
                onChange={(e) => setGradeName(e.target.value)}
                placeholder="Enter product code"
              />
            </div>
            <div>
              <Label htmlFor="cardGrade">Grade</Label>
              <Input
                id="cardGrade"
                value={cardGrade}
                onChange={(e) => setCardGrade(e.target.value)}
                placeholder="Enter grade"
              />
            </div>
         
            <div>
              <Label htmlFor="cardSerial">Serial Number (SSINT ID)</Label>
              <Input
                id="cardSerial"
                value={cardSerial}
                onChange={(e) => setCardSerial(e.target.value)}
                placeholder="Enter serial number"
              />
            </div>
            <div>
              <Label htmlFor="gradingCompany">Grading Company</Label>
              <Input
                id="gradingCompany"
                value={gradingCompany}
                onChange={(e) => setGradingCompany(e.target.value)}
                placeholder="Enter grading company"
              />
            </div>
         
           
            <div>
              <Label htmlFor="frontImage">Front Image</Label>
              <Input
                id="frontImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, true)}
              />
            </div>
            <div>
              <Label htmlFor="backImage">Back Image</Label>
              <Input
                id="backImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, false)}
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Card Preview</h2>
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="flip-switch" className="flex items-center space-x-2">
              <Rotate3D className="w-4 h-4" />
              <span>Flip Card</span>
            </Label>
            <Switch
              id="flip-switch"
              checked={!showFront}
              onCheckedChange={() => setShowFront(!showFront)}
            />
          </div>
          <div ref={cardRef} className="mx-auto" style={{ width: `${casingWidth}px`, height: `${casingHeight}px` }}>
            <Card className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-100 shadow-xl p-2">
              <CardContent className="h-full flex flex-col border-4 border-gray-400 rounded-lg p-1">
                {showFront ? (
                  <>
                  {/* label frontside starts here */}
                    <div className="bg-black text-white mb-2 rounded-md flex flex-col justify-between border-8 border-silver mx-auto"
                         style={{ width: `${labelWidth}px`, height: `${labelHeight}px` }}>
                      <div className="flex text-sm justify-between items-start p-1">
                        <div className="flex flex-col items-start">
                          <div className=" font-semibold">{cardYear} {companyName}</div>
                          <div className=" font-semibold">{cardSet}</div>
                          <div className=" font-semibold">{cardName}</div>
                          <div className="">{type1}</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className=" font-semibold">#{cardNumber}</div>
                          <div className="">{gradeName}</div>
                          <div className="t font-bold">{cardGrade}</div>
                          <div className="">{cardSerial}</div>
                        </div>
                      </div>
                      <div className="text-center text-lg font-bold relative bottom-7 text-white">{gradingCompany}</div>
                    </div>
                    {/* label frontside ends here */}

                    {/* card frontside starts here */}
                    <div className="flex-grow flex items-center justify-center mx-auto overflow-hidden rounded-md"
                         style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}>
                      {frontImage ? (
                        <img src={frontImage} alt="Card Front" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
                          No front image uploaded
                        </div>
                      )}
                    </div>
                    {/* card frontside ends here */}

                  </>
                ) : (
                  <> 
                  {/* label backside starts here */}
                    <div className="bg-black text-white mb-2 rounded-md mx-auto flex flex-col text-xs justify-between border-8 border-silver"
                         style={{ width: `${labelWidth}px`, height: `${labelHeight}px` }}>
                      <div className="flex justify-between items-center h-full p-1">
                        <div className="w-1/3 h-full bg-gradient-to-r from-gray-200 to-gray-400 rounded-md"></div>
                
                        <div className="w-max h-full flex items-center justify-center">
                          <div className="w-[60px] h-[60px] bg-white borde rounded-md flex items-center justify-center">
                            <div className="text-[4px] text-black text-center">
                              ▐█████▌▐█████▌ ▐█████▌▐█████▌ ▐█████▌▐█████▌
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center relative bottom-2 flex w-max mx-auto">
                          <div className="text-lg font-bold">{gradingCompany}</div>
                        </div>
                    </div>
                    {/* label backside ends here */}

                    {/* card backside starts here */}
                    <div className="flex-grow flex items-center justify-center overflow-hidden rounded-md mx-auto"
                         style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}>
                      {backImage ? (
                        <img src={backImage} alt="Card Back" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
                          No back image uploaded
                        </div>
                      )}
                    </div>
                    {/* card backside ends here */}

                  </>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="mt-4 flex justify-center">
            <Button onClick={handleDownload}>Download {showFront ? 'Front' : 'Back'}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}