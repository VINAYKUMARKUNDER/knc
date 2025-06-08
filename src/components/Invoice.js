// import React, { useState } from 'react';
// import { Plus, Trash2, Download } from 'lucide-react';

// const Invoice = () => {
//   const [companyName, setCompanyName] = useState('KUNDER & COMPANY');

//   const [companyDetails, setCompanyDetails] = useState({
//     gstin: '09DULPS6670G2ZV',
//     address: '481/B Chak Dondi, Naini, Prayagraj U. P. India- 211008',
//     mobile: '9198152715',
//     business: 'Deals in : All Type Of Mills, Machinary & Spare Parts Sales & Service'
//   });

//   const [customerDetails, setCustomerDetails] = useState({
//     name: '',
//     address: '',
//     mobile: '',
//     gstin: '',
//     state: '',
//     stateCode: '',
//     placeOfSupply: ''
//   });

//   const [invoiceDetails, setInvoiceDetails] = useState({
//     invoiceNo: '',
//     invoiceDate: '',
//     stateCode: '09'
//   });

//   const [products, setProducts] = useState([
//     { id: 1, particulars: '', hsnCode: '', qty: '', rate: '', taxableValue: '' }
//   ]);

//   const [taxDetails, setTaxDetails] = useState({
//     cgstRate: 9,
//     sgstRate: 9
//   });

//   const [bankDetails, setBankDetails] = useState({
//     bankName: 'Yes Bank',
//     accountNo: '',
//     ifscCode: ''
//   });

//   const addProduct = () => {
//     const newProduct = {
//       id: Date.now(),
//       particulars: '',
//       hsnCode: '',
//       qty: '',
//       rate: '',
//       taxableValue: ''
//     };
//     setProducts([...products, newProduct]);
//   };

//   const removeProduct = (id) => {
//     if (products.length > 1) {
//       setProducts(products.filter(product => product.id !== id));
//     }
//   };

//   const updateProduct = (id, field, value) => {
//     setProducts(products.map(product => 
//       product.id === id ? { ...product, [field]: value } : product
//     ));
//   };

//   const calculateTotals = () => {
//     const totalAmount = products.reduce((sum, product) => {
//       return sum + (parseFloat(product.taxableValue) || 0);
//     }, 0);

//     const cgstAmount = (totalAmount * taxDetails.cgstRate) / 100;
//     const sgstAmount = (totalAmount * taxDetails.sgstRate) / 100;
//     const totalWithTax = totalAmount + cgstAmount + sgstAmount;

//     return { totalAmount, cgstAmount, sgstAmount, totalWithTax };
//   };

//   const { totalAmount, cgstAmount, sgstAmount, totalWithTax } = calculateTotals();

//   const generatePDF = () => {
//     if (!window.html2pdf) {
//       const script = document.createElement('script');
//       script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
//       script.onload = () => {
//         generatePDFContent();
//       };
//       document.head.appendChild(script);
//     } else {
//       generatePDFContent();
//     }
//   };

//   const generatePDFContent = () => {
//     const element = document.getElementById('invoice-content');
//     const opt = {
//     //   margin: [0.3, 0.3, 0.3, 0.3],
//       filename: `Invoice_${invoiceDetails.invoiceNo || 'draft'}.pdf`,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { 
//         scale: 1, 
//         useCORS: true,
//         letterRendering: true,
//         allowTaint: false
//       },
//       jsPDF: { 
//         unit: 'in', 
//         format: 'a4', 
//         orientation: 'portrait',
//         compress: true
//       }
//     };

//     window.html2pdf().set(opt).from(element).save();
//   };

//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5' }}>
//       {/* Controls */}
//       <div style={{ 
//         backgroundColor: 'white', 
//         padding: '20px', 
//         borderRadius: '8px', 
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
//         marginBottom: '20px' 
//       }}>
//         <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Invoice Controls</h2>
//         <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
//           <button 
//             onClick={generatePDF} 
//             style={{
//               backgroundColor: '#2563eb',
//               color: 'white',
//               padding: '10px 20px',
//               border: 'none',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               fontSize: '14px'
//             }}
//           >
//             <Download size={16} />
//             Generate PDF
//           </button>
//           <button 
//             onClick={addProduct}
//             style={{
//               backgroundColor: '#10b981',
//               color: 'white',
//               padding: '10px 20px',
//               border: 'none',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               fontSize: '14px'
//             }}
//           >
//             <Plus size={16} />
//             Add Product Row
//           </button>
//         </div>
//       </div>

//       {/* Invoice */}
//       <div 
//         id="invoice-content" 
//         style={{
//           backgroundColor: 'white',
//           padding: '15px',
//           border: '2px solid black',
//           fontFamily: 'Arial, sans-serif',
//           fontSize: '11px',
//           lineHeight: '1.2',
//           width: '210mm',
//           minHeight: '297mm',
//           boxSizing: 'border-box'
//         }}
//       >
//         {/* Header with GSTIN, TAX INVOICE, Mobile */}
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'space-between', 
//           alignItems: 'center',
//           marginBottom: '10px',
//           fontSize: '12px'
//         }}>
//           <div>
//             <strong>GSTN No.: </strong>
//             <input
//               type="text"
//               value={companyDetails.gstin}
//               onChange={(e) => setCompanyDetails({...companyDetails, gstin: e.target.value})}
//               style={{ 
//                 border: 'none', 
//                 background: 'transparent', 
//                 fontWeight: 'bold',
//                 fontSize: '12px',
//                 width: '150px'
//               }}
//             />
//           </div>
//           <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
//             TAX INVOICE
//           </div>
//           <div>
//             <strong>Mob: </strong>
//             <input
//               type="text"
//               value={companyDetails.mobile}
//               onChange={(e) => setCompanyDetails({...companyDetails, mobile: e.target.value})}
//               style={{ 
//                 border: 'none', 
//                 background: 'transparent', 
//                 fontWeight: 'bold',
//                 fontSize: '12px',
//                 width: '100px'
//               }}
//             />
//           </div>
//         </div>

//         {/* Company Name - Large and Bold */}
//         <div style={{ textAlign: 'center', marginBottom: '8px' }}>
//           <input
//             type="text"
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//             style={{
//               fontSize: '28px',
//               fontWeight: 'bold',
//               textAlign: 'center',
//               border: 'none',
//               background: 'transparent',
//               width: '100%',
//               letterSpacing: '2px'
//             }}
//           />
//         </div>

//         {/* Address and Business */}
//         <div style={{ textAlign: 'center', marginBottom: '12px', fontSize: '10px' }}>
//           <div style={{ marginBottom: '3px' }}>
//             <input
//               type="text"
//               value={companyDetails.address}
//               onChange={(e) => setCompanyDetails({...companyDetails, address: e.target.value})}
//               style={{ 
//                 border: 'none', 
//                 background: 'transparent', 
//                 textAlign: 'center',
//                 width: '100%',
//                 fontSize: '10px'
//               }}
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               value={companyDetails.business}
//               onChange={(e) => setCompanyDetails({...companyDetails, business: e.target.value})}
//               style={{ 
//                 border: 'none', 
//                 background: 'transparent', 
//                 textAlign: 'center',
//                 width: '100%',
//                 fontSize: '10px'
//               }}
//             />
//           </div>
//         </div>

//         {/* Invoice Details Row */}
//         <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '8px' }}>
//           <tr>
//             <td style={{ 
//               border: '1px solid black', 
//               padding: '4px', 
//               fontSize: '9px',
//               width: '25%'
//             }}>
//               <div><strong>GSTIN No.: {companyDetails.gstin}</strong></div>
//               <div style={{ marginTop: '2px' }}><strong>State Code: {invoiceDetails.stateCode}</strong></div>
//             </td>
//             <td style={{ 
//               border: '1px solid black', 
//               padding: '4px', 
//               fontSize: '9px',
//               width: '25%'
//             }}>
//               <input
//                 type="text"
//                 value={invoiceDetails.invoiceNo}
//                 onChange={(e) => setInvoiceDetails({...invoiceDetails, invoiceNo: e.target.value})}
//                 placeholder="Invoice No."
//                 style={{ 
//                   width: '100%', 
//                   border: 'none', 
//                   fontSize: '9px',
//                   marginBottom: '2px'
//                 }}
//               />
//               <div>Tax Invoice No.:</div>
//             </td>
//             <td style={{ 
//               border: '1px solid black', 
//               padding: '4px', 
//               fontSize: '9px',
//               width: '25%'
//             }}>
//               <input
//                 type="date"
//                 value={invoiceDetails.invoiceDate}
//                 onChange={(e) => setInvoiceDetails({...invoiceDetails, invoiceDate: e.target.value})}
//                 style={{ 
//                   width: '100%', 
//                   border: 'none', 
//                   fontSize: '9px',
//                   marginBottom: '2px'
//                 }}
//               />
//               <div>Invoice Date</div>
//             </td>
//             <td style={{ 
//               border: '1px solid black', 
//               padding: '4px', 
//               fontSize: '9px',
//               width: '25%'
//             }}>
//               <input
//                 type="text"
//                 value={customerDetails.mobile}
//                 onChange={(e) => setCustomerDetails({...customerDetails, mobile: e.target.value})}
//                 placeholder="Mobile No."
//                 style={{ 
//                   width: '100%', 
//                   border: 'none', 
//                   fontSize: '9px',
//                   marginBottom: '2px'
//                 }}
//               />
//               <div>Mobile No.:</div>
//             </td>
//           </tr>
//         </table>

//         {/* Invoice to (Customer Details) */}
//         <div style={{ border: '1px solid black', marginBottom: '8px' }}>
//           <div style={{ 
//             backgroundColor: '#f0f0f0', 
//             padding: '4px', 
//             fontSize: '10px', 
//             fontWeight: 'bold',
//             borderBottom: '1px solid black'
//           }}>
//             Invoice to (Details of Receiver)
//           </div>
//           <div style={{ padding: '6px', fontSize: '9px' }}>
//             <div style={{ display: 'flex', marginBottom: '3px' }}>
//               <span style={{ fontWeight: 'bold', width: '60px' }}>Name</span>
//               <span style={{ marginRight: '10px' }}>:</span>
//               <input
//                 type="text"
//                 value={customerDetails.name}
//                 onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
//                 style={{ 
//                   flex: 1, 
//                   border: 'none', 
//                   fontSize: '9px',
//                   borderBottom: '1px dotted #ccc'
//                 }}
//               />
//               <span style={{ fontWeight: 'bold', marginLeft: '20px', width: '60px' }}>GSTIN:</span>
//               <input
//                 type="text"
//                 value={customerDetails.gstin}
//                 onChange={(e) => setCustomerDetails({...customerDetails, gstin: e.target.value})}
//                 style={{ 
//                   width: '120px', 
//                   border: 'none', 
//                   fontSize: '9px',
//                   borderBottom: '1px dotted #ccc'
//                 }}
//               />
//             </div>
//             <div style={{ display: 'flex', marginBottom: '3px' }}>
//               <span style={{ fontWeight: 'bold', width: '60px' }}>ADDRESS</span>
//               <span style={{ marginRight: '10px' }}>:</span>
//               <input
//                 type="text"
//                 value={customerDetails.address}
//                 onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
//                 style={{ 
//                   flex: 1, 
//                   border: 'none', 
//                   fontSize: '9px',
//                   borderBottom: '1px dotted #ccc'
//                 }}
//               />
//               <span style={{ fontWeight: 'bold', marginLeft: '20px', width: '60px' }}>State:</span>
//               <input
//                 type="text"
//                 value={customerDetails.state}
//                 onChange={(e) => setCustomerDetails({...customerDetails, state: e.target.value})}
//                 style={{ 
//                   width: '80px', 
//                   border: 'none', 
//                   fontSize: '9px',
//                   borderBottom: '1px dotted #ccc'
//                 }}
//               />
//               <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>State Code:</span>
//               <input
//                 type="text"
//                 value={customerDetails.stateCode}
//                 onChange={(e) => setCustomerDetails({...customerDetails, stateCode: e.target.value})}
//                 style={{ 
//                   width: '40px', 
//                   border: 'none', 
//                   fontSize: '9px',
//                   borderBottom: '1px dotted #ccc'
//                 }}
//               />
//             </div>
//             <div style={{ display: 'flex' }}>
//               <span style={{ fontWeight: 'bold', width: '100px' }}>Place of Supply:</span>
//               <input
//                 type="text"
//                 value={customerDetails.placeOfSupply}
//                 onChange={(e) => setCustomerDetails({...customerDetails, placeOfSupply: e.target.value})}
//                 style={{ 
//                   flex: 1, 
//                   border: 'none', 
//                   fontSize: '9px',
//                   borderBottom: '1px dotted #ccc'
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Products Table */}
//         <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '8px' }}>
//           <thead>
//             <tr>
//               <th style={{ border: '1px solid black', padding: '4px', fontSize: '9px', fontWeight: 'bold', width: '8%' }}>SL. No.</th>
//               <th style={{ border: '1px solid black', padding: '4px', fontSize: '9px', fontWeight: 'bold', width: '40%' }}>PRITICULARS</th>
//               <th style={{ border: '1px solid black', padding: '4px', fontSize: '9px', fontWeight: 'bold', width: '12%' }}>HSN Code</th>
//               <th style={{ border: '1px solid black', padding: '4px', fontSize: '9px', fontWeight: 'bold', width: '10%' }}>Qty.</th>
//               <th style={{ border: '1px solid black', padding: '4px', fontSize: '9px', fontWeight: 'bold', width: '15%' }}>Rate</th>
//               <th style={{ border: '1px solid black', padding: '4px', fontSize: '9px', fontWeight: 'bold', width: '15%' }}>Taxable Value</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product, index) => (
//               <tr key={product.id}>
//                 <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px', textAlign: 'center' }}>
//                   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
//                     {index + 1}
//                     {products.length > 1 && (
//                       <button
//                         onClick={() => removeProduct(product.id)}
//                         style={{
//                           background: 'none',
//                           border: 'none',
//                           color: '#ef4444',
//                           cursor: 'pointer',
//                           padding: '0'
//                         }}
//                       >
//                         <Trash2 size={10} />
//                       </button>
//                     )}
//                   </div>
//                 </td>
//                 <td style={{ border: '1px solid black', padding: '3px' }}>
//                   <input
//                     type="text"
//                     value={product.particulars}
//                     onChange={(e) => updateProduct(product.id, 'particulars', e.target.value)}
//                     style={{ 
//                       width: '100%', 
//                       border: 'none', 
//                       fontSize: '8px',
//                       background: 'transparent'
//                     }}
//                   />
//                 </td>
//                 <td style={{ border: '1px solid black', padding: '3px' }}>
//                   <input
//                     type="text"
//                     value={product.hsnCode}
//                     onChange={(e) => updateProduct(product.id, 'hsnCode', e.target.value)}
//                     style={{ 
//                       width: '100%', 
//                       border: 'none', 
//                       fontSize: '8px',
//                       background: 'transparent'
//                     }}
//                   />
//                 </td>
//                 <td style={{ border: '1px solid black', padding: '3px' }}>
//                   <input
//                     type="number"
//                     value={product.qty}
//                     onChange={(e) => updateProduct(product.id, 'qty', e.target.value)}
//                     style={{ 
//                       width: '100%', 
//                       border: 'none', 
//                       fontSize: '8px',
//                       background: 'transparent'
//                     }}
//                   />
//                 </td>
//                 <td style={{ border: '1px solid black', padding: '3px' }}>
//                   <input
//                     type="number"
//                     value={product.rate}
//                     onChange={(e) => updateProduct(product.id, 'rate', e.target.value)}
//                     style={{ 
//                       width: '100%', 
//                       border: 'none', 
//                       fontSize: '8px',
//                       background: 'transparent'
//                     }}
//                   />
//                 </td>
//                 <td style={{ border: '1px solid black', padding: '3px' }}>
//                   <input
//                     type="number"
//                     value={product.taxableValue}
//                     onChange={(e) => updateProduct(product.id, 'taxableValue', e.target.value)}
//                     style={{ 
//                       width: '100%', 
//                       border: 'none', 
//                       fontSize: '8px',
//                       background: 'transparent'
//                     }}
//                   />
//                 </td>
//               </tr>
//             ))}
//             {/* Empty rows to fill space */}
//             {Array.from({ length: Math.max(0, 8 - products.length) }, (_, i) => (
//               <tr key={`empty-${i}`} style={{ height: '25px' }}>
//                 <td style={{ border: '1px solid black', padding: '3px' }}></td>
//                 <td style={{ border: '1px solid black', padding: '3px' }}></td>
//                 <td style={{ border: '1px solid black', padding: '3px' }}></td>
//                 <td style={{ border: '1px solid black', padding: '3px' }}></td>
//                 <td style={{ border: '1px solid black', padding: '3px' }}></td>
//                 <td style={{ border: '1px solid black', padding: '3px' }}></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>



import React, { useState } from 'react';
import { Plus, Trash2, Download, Edit2, Save, X } from 'lucide-react';

const Invoice = () => {
    const [companyName, setCompanyName] = useState('KUNDER & COMPANY');

    const [companyDetails, setCompanyDetails] = useState({
        gstin: '09DULPS6670G2ZV',
        address: '481/B Chak Dondi, Naini, Prayagraj U. P. India- 211008',
        mobile: '9198152715',
        business: 'Deals in : All Type Of Mills, Machinary & Spare Parts Sales & Service'
    });

    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        address: '',
        mobile: '',
        gstin: '',
        state: '',
        stateCode: '',
        placeOfSupply: ''
    });

    const [invoiceDetails, setInvoiceDetails] = useState({
        invoiceNo: '',
        invoiceDate: '',
        stateCode: '09'
    });

    const [products, setProducts] = useState([
        { id: 1, particulars: '', hsnCode: '', qty: '', rate: '', taxableValue: '' }
    ]);

    const [taxDetails, setTaxDetails] = useState({
        cgstRate: 9,
        sgstRate: 9
    });

    const [bankDetails, setBankDetails] = useState({
        bankName: 'Yes Bank',
        accountNo: '',
        ifscCode: ''
    });

    const [isEditingTax, setIsEditingTax] = useState(false);

    // Function to convert number to words
    const numberToWords = (num) => {
        if (num === 0) return 'Zero';

        const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        const convertHundreds = (n) => {
            let result = '';
            if (n >= 100) {
                result += ones[Math.floor(n / 100)] + ' Hundred ';
                n %= 100;
            }
            if (n >= 20) {
                result += tens[Math.floor(n / 10)] + ' ';
                n %= 10;
            } else if (n >= 10) {
                result += teens[n - 10] + ' ';
                return result;
            }
            if (n > 0) {
                result += ones[n] + ' ';
            }
            return result;
        };

        if (num < 0) return 'Negative ' + numberToWords(-num);

        let result = '';
        const crores = Math.floor(num / 10000000);
        if (crores > 0) {
            result += convertHundreds(crores) + 'Crore ';
            num %= 10000000;
        }

        const lakhs = Math.floor(num / 100000);
        if (lakhs > 0) {
            result += convertHundreds(lakhs) + 'Lakh ';
            num %= 100000;
        }

        const thousands = Math.floor(num / 1000);
        if (thousands > 0) {
            result += convertHundreds(thousands) + 'Thousand ';
            num %= 1000;
        }

        if (num > 0) {
            result += convertHundreds(num);
        }

        return result.trim();
    };

    const addProduct = () => {
        const newProduct = {
            id: Date.now(),
            particulars: '',
            hsnCode: '',
            qty: '',
            rate: '',
            taxableValue: ''
        };
        setProducts([...products, newProduct]);
    };

    const removeProduct = (id) => {
        if (products.length > 1) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    const updateProduct = (id, field, value) => {
        setProducts(products.map(product => {
            if (product.id === id) {
                const updatedProduct = { ...product, [field]: value };

                // Auto-calculate taxable value if qty and rate are provided
                if (field === 'qty' || field === 'rate') {
                    const qty = parseFloat(field === 'qty' ? value : updatedProduct.qty) || 0;
                    const rate = parseFloat(field === 'rate' ? value : updatedProduct.rate) || 0;
                    updatedProduct.taxableValue = qty * rate;
                }

                return updatedProduct;
            }
            return product;
        }));
    };

    const calculateTotals = () => {
        const totalAmount = products.reduce((sum, product) => {
            return sum + (parseFloat(product.taxableValue) || 0);
        }, 0);

        const cgstAmount = (totalAmount * taxDetails.cgstRate) / 100;
        const sgstAmount = (totalAmount * taxDetails.sgstRate) / 100;
        const totalWithTax = totalAmount + cgstAmount + sgstAmount;

        return { totalAmount, cgstAmount, sgstAmount, totalWithTax };
    };

    const { totalAmount, cgstAmount, sgstAmount, totalWithTax } = calculateTotals();

    const generatePDF = () => {
        if (!window.html2pdf) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = () => {
                generatePDFContent();
            };
            document.head.appendChild(script);
        } else {
            generatePDFContent();
        }
    };

    const generatePDFContent = () => {
        const element = document.getElementById('invoice-content');
        const opt = {
            filename: `Invoice_${invoiceDetails.invoiceNo || 'draft'}.pdf`,
            image: { type: 'jpeg', quality: 10 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                allowTaint: true
            },
            jsPDF: {
                // unit: '', 
                format: 'a4',
                orientation: 'portrait',
                compress: true,

            }
        };

        window.html2pdf().set(opt).from(element).save();
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5' }}>
            {/* Controls */}
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '20px'
            }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Invoice Controls</h2>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button
                        onClick={generatePDF}
                        style={{
                            backgroundColor: '#2563eb',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
                    >
                        <Download size={16} />
                        Generate PDF
                    </button>
                    <button
                        onClick={addProduct}
                        style={{
                            backgroundColor: '#10b981',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
                    >
                        <Plus size={16} />
                        Add Product Row
                    </button>

                    {/* Tax Rate Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Tax Rates:</span>
                        {isEditingTax ? (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span>CGST:</span>
                                    <input
                                        type="number"
                                        value={taxDetails.cgstRate}
                                        onChange={(e) => setTaxDetails({ ...taxDetails, cgstRate: parseFloat(e.target.value) || 0 })}
                                        style={{ width: '50px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                    <span>%</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span>SGST:</span>
                                    <input
                                        type="number"
                                        value={taxDetails.sgstRate}
                                        onChange={(e) => setTaxDetails({ ...taxDetails, sgstRate: parseFloat(e.target.value) || 0 })}
                                        style={{ width: '50px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                    <span>%</span>
                                </div>
                                <button
                                    onClick={() => setIsEditingTax(false)}
                                    style={{ backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', padding: '5px', cursor: 'pointer' }}
                                >
                                    <Save size={14} />
                                </button>
                                <button
                                    onClick={() => setIsEditingTax(false)}
                                    style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', padding: '5px', cursor: 'pointer' }}
                                >
                                    <X size={14} />
                                </button>
                            </>
                        ) : (
                            <>
                                <span>CGST: {taxDetails.cgstRate}% | SGST: {taxDetails.sgstRate}%</span>
                                <button
                                    onClick={() => setIsEditingTax(true)}
                                    style={{ backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', padding: '5px', cursor: 'pointer' }}
                                >
                                    <Edit2 size={14} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Invoice */}
            <div
                id="invoice-content"
                style={{
                    backgroundColor: 'white',
                    padding: '6px',
                    border: '2px solid black',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '11px',
                    lineHeight: '1',
                    width: '203mm',
                    minHeight: '290mm',
                    boxSizing: 'border-box',
                    //   margin: '0 auto'
                    marginTop: '10px',
                }}
            >
                {/* Header with GSTIN, TAX INVOICE, Mobile */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '5px',
                    fontSize: '12px'
                }}>
                    <div style={{ flex: '1' }}>
                        <strong>GSTN No.: </strong>
                        <input
                            type="text"
                            value={companyDetails.gstin}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, gstin: e.target.value })}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                fontWeight: 'bold',
                                fontSize: '12px',
                                width: '150px',
                                textAlign: 'center',
                                borderBottom: '1px #999'
                            }}
                        />
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', flex: '1' }}>
                        TAX INVOICE
                    </div>
                    <div style={{ flex: '1', textAlign: 'right' }}>
                        <strong>Mob: </strong>
                        <input
                            type="text"
                            value={companyDetails.mobile}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, mobile: e.target.value })}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                fontWeight: 'bold',
                                fontSize: '12px',
                                width: '100px',
                                borderBottom: '1px #999'
                            }}
                        />
                    </div>
                </div>

                {/* Company Name - Large and Bold */}
                {/* <div style={{ textAlign: 'center', marginBottom: '10px' }}> */}
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        border: 'none',
                        background: 'transparent',
                        width: '100%',
                        //   letterSpacing: '3px',
                        borderBottom: '10px'
                    }}
                />
                {/* </div> */}

                {/* Address and Business */}
                <div style={{ textAlign: 'center', marginBottom: '15px', fontSize: '11px' }}>
                    <div style={{ marginBottom: '5px' }}>
                        <input
                            type="text"
                            value={companyDetails.address}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, address: e.target.value })}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                textAlign: 'center',
                                width: '100%',
                                fontSize: '11px',
                                borderBottom: '1px #999'
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={companyDetails.business}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, business: e.target.value })}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                textAlign: 'center',
                                width: '100%',
                                fontSize: '11px',
                                borderBottom: '1px #999'
                            }}
                        />
                    </div>
                </div>

                {/* Invoice Details Row */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px', border: '1px solid black' }}>
                    <tbody>
                        <tr>
                            <td style={{
                                border: '1px solid black',
                                padding: '8px',
                                fontSize: '10px',
                                width: '25%',
                                verticalAlign: 'top'
                            }}>
                                <div><strong>GSTIN No.: {companyDetails.gstin}</strong></div>
                                <div style={{ marginTop: '5px' }}><strong>State Code: {invoiceDetails.stateCode}</strong></div>
                            </td>
                            <td style={{
                                border: '1px solid black',
                                padding: '8px',
                                fontSize: '10px',
                                width: '25%',
                                verticalAlign: 'top'
                            }}>
                                <div style={{ marginBottom: '5px' }}>
                                    <strong>Tax Invoice No.:</strong>
                                </div>
                                <input
                                    type="text"
                                    value={invoiceDetails.invoiceNo}
                                    onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceNo: e.target.value })}
                                    placeholder="Enter Invoice No."
                                    style={{
                                        width: '100%',
                                        border: 'none',
                                        fontSize: '10px',
                                        borderBottom: '1px dotted #999',
                                        background: 'transparent'
                                    }}
                                />
                            </td>
                            <td style={{
                                border: '1px solid black',
                                padding: '8px',
                                fontSize: '10px',
                                width: '25%',
                                verticalAlign: 'top'
                            }}>
                                <div style={{ marginBottom: '5px' }}>
                                    <strong>Invoice Date:</strong>
                                </div>
                                <input
                                    type="date"
                                    value={invoiceDetails.invoiceDate}
                                    onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceDate: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: 'none',
                                        fontSize: '10px',
                                        borderBottom: '1px dotted #999',
                                        background: 'transparent'
                                    }}
                                />
                            </td>
                            <td style={{
                                border: '1px solid black',
                                padding: '8px',
                                fontSize: '10px',
                                width: '25%',
                                verticalAlign: 'top'
                            }}>
                                <div style={{ marginBottom: '5px' }}>
                                    <strong>Mobile No.:</strong>
                                </div>
                                <input
                                    type="text"
                                    value={customerDetails.mobile}
                                    onChange={(e) => setCustomerDetails({ ...customerDetails, mobile: e.target.value })}
                                    placeholder="Customer Mobile"
                                    style={{
                                        width: '100%',
                                        border: 'none',
                                        fontSize: '10px',
                                        borderBottom: '1px dotted #999',
                                        background: 'transparent'
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Invoice to (Customer Details) */}
                <div style={{ border: '1px solid black', marginBottom: '10px' }}>
                    <div style={{
                        backgroundColor: '#f0f0f0',
                        padding: '6px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        borderBottom: '1px solid black'
                    }}>
                        Invoice to (Details of Receiver)
                    </div>
                    <div style={{ padding: '10px', fontSize: '10px' }}>
                        <div style={{ display: 'flex', marginBottom: '8px', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', width: '80px', display: 'inline-block' }}>Name:</span>
                            <input
                                type="text"
                                value={customerDetails.name}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                                placeholder="Customer Name"
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    fontSize: '10px',
                                    borderBottom: '1px dotted #999',
                                    background: 'transparent',
                                    marginRight: '20px'
                                }}
                            />
                            <span style={{ fontWeight: 'bold', width: '60px', display: 'inline-block' }}>GSTIN:</span>
                            <input
                                type="text"
                                value={customerDetails.gstin}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, gstin: e.target.value })}
                                placeholder="Customer GSTIN"
                                style={{
                                    width: '150px',
                                    border: 'none',
                                    fontSize: '10px',
                                    borderBottom: '1px dotted #999',
                                    background: 'transparent'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', marginBottom: '8px', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', width: '80px', display: 'inline-block' }}>ADDRESS:</span>
                            <input
                                type="text"
                                value={customerDetails.address}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                                placeholder="Customer Address"
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    fontSize: '10px',
                                    borderBottom: '1px dotted #999',
                                    background: 'transparent',
                                    marginRight: '20px'
                                }}
                            />
                            <span style={{ fontWeight: 'bold', width: '60px', display: 'inline-block' }}>State:</span>
                            <input
                                type="text"
                                value={customerDetails.state}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, state: e.target.value })}
                                placeholder="State"
                                style={{
                                    width: '80px',
                                    border: 'none',
                                    fontSize: '10px',
                                    borderBottom: '1px dotted #999',
                                    background: 'transparent',
                                    marginRight: '10px'
                                }}
                            />
                            <span style={{ fontWeight: 'bold', display: 'inline-block' }}>Code:</span>
                            <input
                                type="text"
                                value={customerDetails.stateCode}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, stateCode: e.target.value })}
                                placeholder="Code"
                                style={{
                                    width: '50px',
                                    border: 'none',
                                    fontSize: '10px',
                                    borderBottom: '1px dotted #999',
                                    background: 'transparent'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', width: '120px', display: 'inline-block' }}>Place of Supply:</span>
                            <input
                                type="text"
                                value={customerDetails.placeOfSupply}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, placeOfSupply: e.target.value })}
                                placeholder="Place of Supply"
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    fontSize: '10px',
                                    borderBottom: '1px dotted #999',
                                    background: 'transparent'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px', border: '1px solid black' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '6px', fontSize: '10px', fontWeight: 'bold', width: '8%', backgroundColor: '#f8f9fa' }}>SL. No.</th>
                            <th style={{ border: '1px solid black', padding: '6px', fontSize: '10px', fontWeight: 'bold', width: '40%', backgroundColor: '#f8f9fa' }}>PARTICULARS</th>
                            <th style={{ border: '1px solid black', padding: '6px', fontSize: '10px', fontWeight: 'bold', width: '12%', backgroundColor: '#f8f9fa' }}>HSN Code</th>
                            <th style={{ border: '1px solid black', padding: '6px', fontSize: '10px', fontWeight: 'bold', width: '10%', backgroundColor: '#f8f9fa' }}>Qty.</th>
                            <th style={{ border: '1px solid black', padding: '6px', fontSize: '10px', fontWeight: 'bold', width: '15%', backgroundColor: '#f8f9fa' }}>Rate</th>
                            <th style={{ border: '1px solid black', padding: '6px', fontSize: '10px', fontWeight: 'bold', width: '15%', backgroundColor: '#f8f9fa' }}>Taxable Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td style={{ border: '1px solid black', padding: '5px', fontSize: '10px', textAlign: 'center', verticalAlign: 'middle' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                                        {index + 1}
                                        {products.length > 1 && (
                                            <button
                                                onClick={() => removeProduct(product.id)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#ef4444',
                                                    cursor: 'pointer',
                                                    padding: '2px',
                                                    borderRadius: '2px'
                                                }}
                                                title="Remove this row"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>
                                    <input
                                        type="text"
                                        value={product.particulars}
                                        onChange={(e) => updateProduct(product.id, 'particulars', e.target.value)}
                                        placeholder="Enter product details"
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            fontSize: '9px',
                                            background: 'transparent'
                                        }}
                                    />
                                </td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>
                                    <input
                                        type="text"
                                        value={product.hsnCode}
                                        onChange={(e) => updateProduct(product.id, 'hsnCode', e.target.value)}
                                        placeholder="HSN Code"
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            fontSize: '9px',
                                            background: 'transparent',
                                            textAlign: 'center'
                                        }}
                                    />
                                </td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>
                                    <input
                                        type="number"
                                        value={product.qty}
                                        onChange={(e) => updateProduct(product.id, 'qty', e.target.value)}
                                        placeholder="Qty"
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            fontSize: '9px',
                                            background: 'transparent',
                                            textAlign: 'center'
                                        }}
                                    />
                                </td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>
                                    <input
                                        type="number"
                                        value={product.rate}
                                        onChange={(e) => updateProduct(product.id, 'rate', e.target.value)}
                                        placeholder="Rate"
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            fontSize: '9px',
                                            background: 'transparent',
                                            textAlign: 'right'
                                        }}
                                    />
                                </td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>
                                    <input
                                        type="number"
                                        value={product.taxableValue}
                                        onChange={(e) => updateProduct(product.id, 'taxableValue', e.target.value)}
                                        placeholder="Amount"
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            fontSize: '9px',
                                            background: 'transparent',
                                            textAlign: 'right'
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                        {/* Empty rows to fill space */}
                        {Array.from({ length: Math.max(0, 8 - products.length) }, (_, i) => (
                            <tr key={`empty-${i}`} style={{ height: '30px' }}>
                                <td style={{ border: '1px solid black', padding: '5px' }}></td>
                                <td style={{ border: '1px solid black', padding: '5px' }}></td>
                                <td style={{ border: '1px solid black', padding: '5px' }}></td>
                                <td style={{ border: '1px solid black', padding: '5px' }}></td>
                                <td style={{ border: '1px solid black', padding: '5px' }}></td>
                                <td style={{ border: '1px solid black', padding: '5px' }}></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Bottom Section - Terms and Totals */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    {/* Left Side - Rupees in Words and Terms */}
                    <div style={{ flex: '1' }}>
                        <div style={{ border: '1px solid black', padding: '4px', marginBottom: '4px', minHeight: '20px' }}>
                            <div style={{ fontSize: '8px' }}>
                                <strong>Rupees (in Word)</strong>
                                <div style={{
                                    marginTop: '5px',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize'
                                }}>
                                    {totalWithTax > 0 ? `${numberToWords(Math.floor(totalWithTax))} Rupees ${totalWithTax % 1 > 0 ? `and ${Math.round((totalWithTax % 1) * 100)} Paisa` : ''} Only` : ''}
                                </div>
                            </div>
                        </div>
                        <div style={{ border: '1px solid black', padding: '4px', fontSize: '8px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>TERMS & CONDITIONS:</div>
                            <div style={{ fontSize: '7px', lineHeight: '1.3' }}>
                                <div><strong>1. Delivery</strong> : 20 to 25 days after receving PO & Advance</div>
                                <div><strong>2. Payment Schedule</strong> : 40% Advance & Balance against delivery</div>
                                <div><strong>3. Duties/Taxes</strong> : As applicable</div>
                                <div><strong>4. Loading/Unloading</strong> : Extra</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Totals */}
                    <div style={{ width: '250px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px', fontWeight: 'bold' }}>Total Amount</td>
                                <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px', textAlign: 'right' }}>
                                    {totalAmount.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px' }}>CGST @ {taxDetails.cgstRate}%</td>
                                <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px', textAlign: 'right' }}>
                                    {cgstAmount.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px' }}>SGST @ {taxDetails.sgstRate}%</td>
                                <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px', textAlign: 'right' }}>
                                    {sgstAmount.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px', fontWeight: 'bold' }}>Total Amount GST</td>
                                <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px', fontWeight: 'bold', textAlign: 'right' }}>
                                    {(cgstAmount + sgstAmount).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px', fontWeight: 'bold' }}>Total Amount After Tax</td>
                                <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px', fontWeight: 'bold', textAlign: 'right' }}>
                                    {totalWithTax.toFixed(2)}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                {/* Bank Details */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '8px' }}>
                    <thead>
                        <tr>
                            <th colSpan="3" style={{
                                border: '1px solid black',
                                padding: '4px',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>
                                Bank Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', width: '33%' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '9px', marginBottom: '2px' }}>Bank Name</div>
                                <input
                                    type="text"
                                    value={bankDetails.bankName}
                                    onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: 'none',
                                        fontSize: '8px',
                                        textAlign: 'center',
                                        background: 'transparent'
                                    }}
                                />
                            </td>
                            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', width: '33%' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '9px', marginBottom: '2px' }}>Bank Account No.</div>
                                <input
                                    type="text"
                                    value={bankDetails.accountNo}
                                    onChange={(e) => setBankDetails({ ...bankDetails, accountNo: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: 'none',
                                        fontSize: '8px',
                                        textAlign: 'center',
                                        background: 'transparent'
                                    }}
                                />
                            </td>
                            <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', width: '34%' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '9px', marginBottom: '2px' }}>IFSC Code</div>
                                <input
                                    type="text"
                                    value={bankDetails.ifscCode}
                                    onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: 'none',
                                        fontSize: '8px',
                                        textAlign: 'center',
                                        background: 'transparent'
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', marginTop: '15px' }}>
                    <div>
                        <div style={{ fontWeight: 'bold' }}>E. & O. E.</div>
                        <div>Subject to Prayagraj (Allahabad) Jurisdiction only</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div>For : {companyName}</div>
                        <div style={{ marginTop: '30px', borderTop: '1px solid black', paddingTop: '2px' }}>
                            Authorized Signature
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;