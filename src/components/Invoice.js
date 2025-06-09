
import React, { useState } from 'react';
import { Plus, Trash2, Download, Edit2, Save, X, Bold, Italic, Underline } from 'lucide-react';

const Invoice = () => {
    const [companyName, setCompanyName] = useState('KUNDER & COMPANY');

    const [companyDetails, setCompanyDetails] = useState({
        gstin: '09DULPS6670G2ZV',
        taxinvoice: 'TAX INVOICE',
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

    // Text formatting states
    const [textFormats, setTextFormats] = useState({
        companyName: { fontSize: 32, bold: true, italic: false, underline: false },
        companyGstin: { fontSize: 12, bold: true, italic: false, underline: false },
        taxInvoice: { fontSize: 18, bold: true, italic: false, underline: false },
        companyMobile: { fontSize: 12, bold: true, italic: false, underline: false },
        companyAddress: { fontSize: 11, bold: false, italic: false, underline: false },
        companyBusiness: { fontSize: 11, bold: false, italic: false, underline: false },
        tableHeaders: { fontSize: 10, bold: true, italic: false, underline: false },
        tableContent: { fontSize: 9, bold: false, italic: false, underline: false },
        totalsLabels: { fontSize: 9, bold: true, italic: false, underline: false },
        totalsValues: { fontSize: 9, bold: false, italic: false, underline: false },
        termsTitle: { fontSize: 8, bold: true, italic: false, underline: false },
        termsContent: { fontSize: 7, bold: false, italic: false, underline: false },
        rupeesInWords: { fontSize: 10, bold: true, italic: false, underline: false },
        bankDetails: { fontSize: 9, bold: false, italic: false, underline: false },
        footer: { fontSize: 8, bold: false, italic: false, underline: false }
    });

    const [isEditingTax, setIsEditingTax] = useState(false);
    const [showTextControls, setShowTextControls] = useState(false);

    // Function to update text format
    const updateTextFormat = (element, property, value) => {
        setTextFormats(prev => ({
            ...prev,
            [element]: {
                ...prev[element],
                [property]: value
            }
        }));
    };

    // Function to get style object from format
    const getTextStyle = (element, additionalStyles = {}) => {
        const format = textFormats[element];
        return {
            fontSize: `${format.fontSize}px`,
            fontWeight: format.bold ? 'bold' : 'normal',
            fontStyle: format.italic ? 'italic' : 'normal',
            textDecoration: format.underline ? 'underline' : 'none',
            ...additionalStyles
        };
    };

    // Text control component
    const TextControl = ({ label, element }) => (
        <div style={{
            backgroundColor: '#f8f9fa',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #e9ecef',
            marginBottom: '8px'
        }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>{label}</div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Font Size Slider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', minWidth: '60px' }}>Size: {textFormats[element].fontSize}px</span>
                    <input
                        type="range"
                        min="6"
                        max="48"
                        value={textFormats[element].fontSize}
                        onChange={(e) => updateTextFormat(element, 'fontSize', parseInt(e.target.value))}
                        style={{ width: '100px' }}
                    />
                </div>

                {/* Bold Toggle */}
                <button
                    onClick={() => updateTextFormat(element, 'bold', !textFormats[element].bold)}
                    style={{
                        backgroundColor: textFormats[element].bold ? '#2563eb' : '#e5e7eb',
                        color: textFormats[element].bold ? 'white' : '#374151',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px'
                    }}
                >
                    <Bold size={14} />
                    Bold
                </button>

                {/* Italic Toggle */}
                <button
                    onClick={() => updateTextFormat(element, 'italic', !textFormats[element].italic)}
                    style={{
                        backgroundColor: textFormats[element].italic ? '#2563eb' : '#e5e7eb',
                        color: textFormats[element].italic ? 'white' : '#374151',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px'
                    }}
                >
                    <Italic size={14} />
                    Italic
                </button>

                {/* Underline Toggle */}
                <button
                    onClick={() => updateTextFormat(element, 'underline', !textFormats[element].underline)}
                    style={{
                        backgroundColor: textFormats[element].underline ? '#2563eb' : '#e5e7eb',
                        color: textFormats[element].underline ? 'white' : '#374151',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px'
                    }}
                >
                    <Underline size={14} />
                    Underline
                </button>
            </div>
        </div>
    );

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

     const roundToNextWhole = (value) => {
        const rounded = Number.isInteger(value) ? value : Math.ceil(value);
        return parseFloat(rounded.toFixed(2));
    };

    const updateProduct = (id, field, value) => {
        setProducts(products.map(product => {
            if (product.id === id) {
                const updatedProduct = { ...product, [field]: value };

                // Auto-calculate taxable value if qty and rate are provided
                if (field === 'qty' || field === 'rate') {
                    const qty = parseFloat(field === 'qty' ? value : updatedProduct.qty) || 0;
                    const rate = parseFloat(field === 'rate' ? value : updatedProduct.rate) || 0;
                    updatedProduct.taxableValue = roundToNextWhole(qty * rate);
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

        return {
            totalAmount: roundToNextWhole(totalAmount),
            cgstAmount: roundToNextWhole(cgstAmount),
            sgstAmount: roundToNextWhole(sgstAmount),
            totalWithTax: roundToNextWhole(totalWithTax)
        };
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
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '20px' }}>
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

                    {/* Text Controls Toggle */}
                    <button
                        onClick={() => setShowTextControls(!showTextControls)}
                        style={{
                            backgroundColor: showTextControls ? '#ef4444' : '#8b5cf6',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {showTextControls ? 'Hide Text Controls' : 'Show Text Controls'}
                    </button>
                </div>

                {/* Text Controls Panel */}
                {showTextControls && (
                    <div style={{
                        backgroundColor: '#f8f9fa',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '2px solid #e9ecef',
                        marginTop: '15px'
                    }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#2563eb' }}>Text Formatting Controls</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '15px' }}>
                            <TextControl label="Company Name" element="companyName" />
                            <TextControl label="Company GSTIN" element="companyGstin" />
                            <TextControl label="Tax Invoice Title" element="taxInvoice" />
                            <TextControl label="Company Mobile" element="companyMobile" />
                            <TextControl label="Company Address" element="companyAddress" />
                            <TextControl label="Company Business" element="companyBusiness" />
                            <TextControl label="Table Headers" element="tableHeaders" />
                            <TextControl label="Table Content" element="tableContent" />
                            <TextControl label="Totals Labels" element="totalsLabels" />
                            <TextControl label="Totals Values" element="totalsValues" />
                            <TextControl label="Terms Title" element="termsTitle" />
                            <TextControl label="Terms Content" element="termsContent" />
                            <TextControl label="Rupees in Words" element="rupeesInWords" />
                            <TextControl label="Bank Details" element="bankDetails" />
                            <TextControl label="Footer Text" element="footer" />
                        </div>
                    </div>
                )}
            </div>

            {/* Invoice */}
            <div
                id="invoice-content"
                style={{
                    backgroundColor: 'white',
                    padding: '9px',
                    border: '2px solid black',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '11px',
                    lineHeight: '1',
                    width: '203mm',
                    minHeight: '280mm',
                    boxSizing: 'border-box',
                    marginTop: '7px',
                }}
            >
                {/* Header with GSTIN, TAX INVOICE, Mobile */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '5px'
                }}>
                    <div style={{ flex: '1' }}>
                        <strong style={getTextStyle('companyGstin')}>GSTN No.: </strong>
                        <input
                            type="text"
                            value={companyDetails.gstin}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, gstin: e.target.value })}
                            style={{
                                ...getTextStyle('companyGstin', {
                                    border: 'none',
                                    background: 'transparent',
                                    width: '150px',
                                    textAlign: 'center',
                                    borderBottom: '1px #999'
                                })
                            }}
                        />
                    </div>

                    <div style={{ textAlign: 'center', flex: '1' }}>
                        <input
                            type="text"
                            value={companyDetails.taxinvoice}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, taxinvoice: e.target.value })}
                            style={{
                                ...getTextStyle('taxInvoice', {
                                    border: 'none',
                                    background: 'transparent',
                                    borderBottom: '1px #999',
                                    flex: '1',
                                    textAlign: 'center'
                                })
                            }}
                        />
                    </div>
                    <div style={{ flex: '1', textAlign: 'right' }}>
                        <strong style={getTextStyle('companyMobile')}>Mob: </strong>
                        <input
                            type="text"
                            value={companyDetails.mobile}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, mobile: e.target.value })}
                            style={{
                                ...getTextStyle('companyMobile', {
                                    border: 'none',
                                    background: 'transparent',
                                    width: '100px',
                                    borderBottom: '1px #999'
                                })
                            }}
                        />
                    </div>
                </div>

                {/* Company Name - Large and Bold */}
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    style={{
                        ...getTextStyle('companyName', {
                            textAlign: 'center',
                            border: 'none',
                            background: 'transparent',
                            width: '100%',
                            borderBottom: '10px'
                        })
                    }}
                />

                {/* Address and Business */}
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <div style={{ marginBottom: '5px' }}>
                        <input
                            type="text"
                            value={companyDetails.address}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, address: e.target.value })}
                            style={{
                                ...getTextStyle('companyAddress', {
                                    border: 'none',
                                    background: 'transparent',
                                    textAlign: 'center',
                                    width: '100%',
                                    borderBottom: '1px #999'
                                })
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={companyDetails.business}
                            onChange={(e) => setCompanyDetails({ ...companyDetails, business: e.target.value })}
                            style={{
                                ...getTextStyle('companyBusiness', {
                                    border: 'none',
                                    background: 'transparent',
                                    textAlign: 'center',
                                    width: '100%',
                                    borderBottom: '1px #999'
                                })
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
                                width: '25%',
                                verticalAlign: 'top'
                            }}>
                                <div style={getTextStyle('tableContent', { fontWeight: 'bold' })}>GSTIN No.: {companyDetails.gstin}</div>
                                <div style={{ ...getTextStyle('tableContent', { fontWeight: 'bold' }), marginTop: '5px' }}>State Code: {invoiceDetails.stateCode}</div>
                            </td>
                            <td style={{
                                border: '1px solid black',
                                padding: '8px',
                                width: '25%',
                                verticalAlign: 'top'
                            }}>
                                <div style={{ ...getTextStyle('tableContent', { fontWeight: 'bold' }), marginBottom: '5px' }}>
                                    Tax Invoice No.:
                                </div>
                                <input
                                    type="text"
                                    value={invoiceDetails.invoiceNo}
                                    onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceNo: e.target.value })}
                                    placeholder="Enter Invoice No."
                                    style={{
                                        ...getTextStyle('tableContent', {
                                            width: '100%',
                                            border: 'none',
                                            borderBottom: '1px dotted #999',
                                            background: 'transparent'
                                        })
                                    }}
                                />
                            </td>
                            <td style={{
                                border: '1px solid black',
                                padding: '8px',
                                width: '25%',
                                verticalAlign: 'top'
                            }}>
                                <div style={{ ...getTextStyle('tableContent', { fontWeight: 'bold' }), marginBottom: '5px' }}>
                                    Invoice Date:
                                </div>
                                <input
                                    type="date"
                                    value={invoiceDetails.invoiceDate}
                                    onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceDate: e.target.value })}
                                    style={{
                                        ...getTextStyle('tableContent', {
                                            width: '100%',
                                            border: 'none',
                                            borderBottom: '1px dotted #999',
                                            background: 'transparent'
                                        })
                                    }}
                                />
                            </td>
                            <td style={{
                                border: '1px solid black',
                                padding: '8px',
                                width: '25%',
                                verticalAlign: 'top'
                            }}>
                                <div style={{ ...getTextStyle('tableContent', { fontWeight: 'bold' }), marginBottom: '5px' }}>
                                    Mobile No.:
                                </div>
                                <input
                                    type="text"
                                    value={customerDetails.mobile}
                                    onChange={(e) => setCustomerDetails({ ...customerDetails, mobile: e.target.value })}
                                    placeholder="Customer Mobile"
                                    style={{
                                        ...getTextStyle('tableContent', {
                                            width: '100%',
                                            border: 'none',
                                            borderBottom: '1px dotted #999',
                                            background: 'transparent'
                                        })
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
                        fontWeight: 'bold',
                        borderBottom: '1px solid black',
                        ...getTextStyle('tableHeaders')
                    }}>
                        Invoice to (Details of Receiver)
                    </div>
                    <div style={{ padding: '10px' }}>
                        <div style={{ display: 'flex', marginBottom: '8px', alignItems: 'center' }}>
                            <span style={{ ...getTextStyle('tableContent', { fontWeight: 'bold' }), width: '80px', display: 'inline-block' }}>Name:</span>
                            <input
                                type="text"
                                value={customerDetails.name}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                                placeholder="Customer Name"
                                style={{
                                    ...getTextStyle('tableContent', {
                                        flex: 1,
                                        border: 'none',
                                        borderBottom: '1px dotted #999',
                                        background: 'transparent',
                                        marginRight: '20px'
                                    })
                                }}
                            />
                            <span style={{ ...getTextStyle('tableContent', { fontWeight: 'bold' }), width: '60px', display: 'inline-block' }}>GSTIN:</span>
                            <input
                                type="text"
                                value={customerDetails.gstin}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, gstin: e.target.value })}
                                placeholder="Customer GSTIN"
                                style={{
                                    ...getTextStyle('tableContent', {
                                        width: '150px',
                                        border: 'none',
                                        borderBottom: '1px dotted #999',
                                        background: 'transparent'
                                    })
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
                                    ...getTextStyle('tableContent', {
                                        width: '80px',
                                        border: 'none',
                                        fontSize: '10px',
                                        borderBottom: '1px dotted #999',
                                        background: 'transparent',
                                        marginRight: '10px'
                                    })
                                }}
                            />
                            <span style={{ fontWeight: 'bold', display: 'inline-block' }}>Code:</span>
                            <input
                                type="text"
                                value={customerDetails.stateCode}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, stateCode: e.target.value })}
                                placeholder="Code"
                                style={{
                                    ...getTextStyle('tableContent', {
                                        width: '50px',
                                        border: 'none',
                                        fontSize: '10px',
                                        borderBottom: '1px dotted #999',
                                        background: 'transparent'
                                    })
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
                                    ...getTextStyle('tableContent', {
                                        flex: 1,
                                        border: 'none',
                                        fontSize: '10px',
                                        borderBottom: '1px dotted #999',
                                        background: 'transparent'
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <table style={{ ...getTextStyle('tableContent', { width: '100%', borderCollapse: 'collapse', marginBottom: '10px', border: '1px solid black' }) }}>
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
                                        {/* {products.length > 1 && (
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
                                        )} */}
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
                                            textAlign: 'right',
                                            fontWeight: 'bold'
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
                                    ...getTextStyle('rupeesInWords', {
                                        marginTop: '5px',
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize'
                                    })
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
                <table style={{ ...getTextStyle('bankDetails', { width: '100%', borderCollapse: 'collapse', marginBottom: '8px' }) }}>
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
                <div style={{ ...getTextStyle('footer', { display: 'flex', justifyContent: 'space-between', fontSize: '8px', marginTop: '15px', }) }}>
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