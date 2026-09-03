export async function POST(request) {
    try {
      const data = await request.json();
      const { name, phone, email, budgetMin, budgetMax, bodyType, familySize, message } = data;
  
      if (!name || !phone) {
        return NextResponse.json({ message: 'Name and Phone are required' }, { status: 400 });
      }
  
      const mashwara = await prisma.mashwaraRequest.create({
        data: {
          name,
          phone,
          email: email || null,
          budgetMin: budgetMin ? parseFloat(budgetMin) : null,
          budgetMax: budgetMax ? parseFloat(budgetMax) : null,
          bodyType: bodyType || null,
          familySize: familySize || null,
          message: message || null,
          paymentStatus: 'free',
        },
      });
  
      return NextResponse.json({ 
        success: true, 
        message: 'Request submitted. Chacha will contact you on WhatsApp!',
        mashwara 
      }, { status: 201 });
  
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }