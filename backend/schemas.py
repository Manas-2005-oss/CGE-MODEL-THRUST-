from pydantic import BaseModel

class SimulationInput(BaseModel):
    agriProd: float
    mfgProd: float
    svcProd: float

    incomeTax: float
    corporateTax: float

    govSpending: float
    infraShare: float

    agriSubsidy: float
    mfgSubsidy: float
    svcSubsidy: float

    laborShift: float
    minWage: float

    fromSector: str = "agriculture"
    toSector: str = "manufacturing" 