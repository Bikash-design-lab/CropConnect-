import React from "react";
import { useNavigate } from "react-router-dom";

const FarmLaw = () => {
  const navigate = useNavigate()
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "white",
          padding: "1.5rem",
          // background: "linear-gradient(to right, #d4edda, #a8e6cf)",
        }}
      >
        <div
          style={{
            maxWidth: "1600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
        >

          {/* Header */}
          <div
            style={{
              // border: "4px solid red",
              backgroundImage:
                "linear-gradient(120deg, #8fd3f4 100%, #84fab0 0%)",
              // padding: "2rem 0",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              // backgroundColor: "#166534",
              // color: "#ffffff",
              color: "black",
              fontSize: "20px",
              padding: "1.5rem",
              borderRadius: "10px",
            }}
          >
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
              }}
            >
              Farmer Protection Portal
            </h1>
            <p
              style={{
                marginTop: "0.5rem",
                opacity: "0.8",
              }}
            >
              Laws, Resources, and Reporting Tools for Indian Farmers
            </p>
          </div>

          {/* Main Content */}
          <div style={{ padding: "1.5rem" }}>
            {/* Laws Section */}
            <section style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#dcfce7",
                    padding: "0.5rem",
                    borderRadius: "9999px",
                    marginRight: "0.75rem",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#166534" }}
                  >
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#166534",
                  }}
                >
                  Laws Protecting Indian Farmers
                </h2>
              </div>
              <div
                style={{
                  backgroundColor: "#f0fdf4",
                  padding: "1rem",
                  borderRadius: "0.75rem",
                }}
              >
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {[
                    {
                      title: "Farmers' Produce Trade and Commerce Act, 2020",
                      description:
                        "Allows farmers to sell their produce outside APMC mandis.",
                    },
                    {
                      title: "Farmers Agreement on Price Assurance Act, 2020",
                      description:
                        "Ensures price assurance for farmers with a dispute resolution mechanism.",
                    },
                    {
                      title: "Essential Commodities (Amendment) Act, 2020",
                      description:
                        "Deregulates storage, production, and sale of certain food items.",
                    },
                    {
                      title: "Minimum Support Price (MSP)",
                      description:
                        "Guarantees minimum prices for specific crops to protect farmers.",
                    },
                    {
                      title: "Agricultural Produce Market Committee (APMC) Act",
                      description:
                        "Regulates agricultural markets for fair pricing.",
                    },
                  ].map((item, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        marginBottom: index < 4 ? "0.75rem" : 0,
                      }}
                    >
                      <div
                        style={{
                          flexShrink: 0,
                          height: "1.25rem",
                          width: "1.25rem",
                          position: "relative",
                          marginTop: "0.25rem",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "9999px",
                            backgroundColor: "#bbf7d0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              height: "0.5rem",
                              width: "0.5rem",
                              borderRadius: "9999px",
                              backgroundColor: "#16a34a",
                            }}
                          ></div>
                        </div>
                      </div>
                      <p
                        style={{
                          marginLeft: "0.75rem",
                          marginTop: 0,
                          marginBottom: 0,
                        }}
                      >
                        <strong style={{ color: "#166534" }}>
                          {item.title}:
                        </strong>{" "}
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Helpline Section */}
            <section style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#dbeafe",
                    padding: "0.5rem",
                    borderRadius: "9999px",
                    marginRight: "0.75rem",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#1e40af" }}
                  >
                    <path
                      d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70084 3 9.09388 3.27543 9.25707 3.68377L10.8565 8.16795C11.0009 8.5438 10.9385 8.97539 10.6822 9.28769L8.25061 12.1927C9.25058 14.3704 10.9421 16.0621 13.1197 17.0621L16.0243 14.6306C16.3366 14.3743 16.7682 14.3118 17.144 14.4563L21.6276 16.0558C22.036 16.219 22.3114 16.612 22.3114 17.0336V20.3C22.3114 21.4046 21.416 22.3 20.3114 22.3H19.3114C10.5827 22.3 3.5 15.2173 3.5 6.48865V5.5C3.5 5.22386 3.72386 5 4 5H5C4 5 3 5 3 5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#1e40af",
                  }}
                >
                  Key Helpline Numbers and Online Resources
                </h2>
              </div>
              <div
                style={{
                  backgroundColor: "#eff6ff",
                  padding: "1rem",
                  borderRadius: "0.75rem",
                }}
              >
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  <li
                    style={{
                      display: "flex",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        height: "1.25rem",
                        width: "1.25rem",
                        position: "relative",
                        marginTop: "0.25rem",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "9999px",
                          backgroundColor: "#bfdbfe",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "0.5rem",
                            width: "0.5rem",
                            borderRadius: "9999px",
                            backgroundColor: "#2563eb",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p
                      style={{
                        marginLeft: "0.75rem",
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      Punjab Farmers' Helpline for DAP Fertilizer Fraud:{" "}
                      <span
                        style={{
                          backgroundColor: "#dbeafe",
                          color: "#1e40af",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "0.25rem",
                          fontWeight: "500",
                        }}
                      >
                        1100
                      </span>{" "}
                      | WhatsApp:{" "}
                      <span
                        style={{
                          backgroundColor: "#dbeafe",
                          color: "#1e40af",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "0.25rem",
                          fontWeight: "500",
                        }}
                      >
                        +91-98555-01076
                      </span>
                    </p>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        height: "1.25rem",
                        width: "1.25rem",
                        position: "relative",
                        marginTop: "0.25rem",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "9999px",
                          backgroundColor: "#bfdbfe",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "0.5rem",
                            width: "0.5rem",
                            borderRadius: "9999px",
                            backgroundColor: "#2563eb",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p
                      style={{
                        marginLeft: "0.75rem",
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      National Cyber Crime Helpline:{" "}
                      <a
                        href="https://cybercrime.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#2563eb",
                          textDecoration: "underline",
                          fontWeight: "500",
                        }}
                      >
                        cybercrime.gov.in
                      </a>
                    </p>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        height: "1.25rem",
                        width: "1.25rem",
                        position: "relative",
                        marginTop: "0.25rem",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "9999px",
                          backgroundColor: "#bfdbfe",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "0.5rem",
                            width: "0.5rem",
                            borderRadius: "9999px",
                            backgroundColor: "#2563eb",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p
                      style={{
                        marginLeft: "0.75rem",
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      Chakshu - Report Fraud Communication:{" "}
                      <a
                        href="https://cybercrime.gov.in/webform/Crime_NodalGrivanceList.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#2563eb",
                          textDecoration: "underline",
                          fontWeight: "500",
                        }}
                      >
                        Chakshu Portal
                      </a>
                    </p>
                  </li>
                  <li
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        height: "1.25rem",
                        width: "1.25rem",
                        position: "relative",
                        marginTop: "0.25rem",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "9999px",
                          backgroundColor: "#bfdbfe",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "0.5rem",
                            width: "0.5rem",
                            borderRadius: "9999px",
                            backgroundColor: "#2563eb",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p
                      style={{
                        marginLeft: "0.75rem",
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      Kisan Call Center (KCC):{" "}
                      <span
                        style={{
                          backgroundColor: "#dbeafe",
                          color: "#1e40af",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "0.25rem",
                          fontWeight: "500",
                        }}
                      >
                        1800-180-1551
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
            </section>

            {/* Resources Section */}
            <section style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#fef3c7",
                    padding: "0.5rem",
                    borderRadius: "9999px",
                    marginRight: "0.75rem",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#92400e" }}
                  >
                    <path
                      d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#92400e",
                  }}
                >
                  Useful Websites and Resources
                </h2>
              </div>
              <div
                style={{
                  backgroundColor: "#fffbeb",
                  padding: "1rem",
                  borderRadius: "0.75rem",
                }}
              >
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  <li
                    style={{
                      display: "flex",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        height: "1.25rem",
                        width: "1.25rem",
                        position: "relative",
                        marginTop: "0.25rem",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "9999px",
                          backgroundColor: "#fde68a",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "0.5rem",
                            width: "0.5rem",
                            borderRadius: "9999px",
                            backgroundColor: "#d97706",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p
                      style={{
                        marginLeft: "0.75rem",
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      <a
                        href="https://fssai.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#b45309",
                          textDecoration: "underline",
                          fontWeight: "500",
                        }}
                      >
                        Food Safety and Standards Authority of India (FSSAI)
                      </a>
                    </p>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        height: "1.25rem",
                        width: "1.25rem",
                        position: "relative",
                        marginTop: "0.25rem",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "9999px",
                          backgroundColor: "#fde68a",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "0.5rem",
                            width: "0.5rem",
                            borderRadius: "9999px",
                            backgroundColor: "#d97706",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p
                      style={{
                        marginLeft: "0.75rem",
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      <a
                        href="https://krishijagran.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#b45309",
                          textDecoration: "underline",
                          fontWeight: "500",
                        }}
                      >
                        Krishi Jagran
                      </a>
                    </p>
                  </li>
                  <li
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        height: "1.25rem",
                        width: "1.25rem",
                        position: "relative",
                        marginTop: "0.25rem",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "9999px",
                          backgroundColor: "#fde68a",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "0.5rem",
                            width: "0.5rem",
                            borderRadius: "9999px",
                            backgroundColor: "#d97706",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p
                      style={{
                        marginLeft: "0.75rem",
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      <a
                        href="https://tax2win.in/guide/fssai-rules-and-regulations"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#b45309",
                          textDecoration: "underline",
                          fontWeight: "500",
                        }}
                      >
                        FSSAI Rules & Regulations
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </section>

            {/* Food Safety Section */}
            <section style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#fee2e2",
                    padding: "0.5rem",
                    borderRadius: "9999px",
                    marginRight: "0.75rem",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#b91c1c" }}
                  >
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#b91c1c",
                  }}
                >
                  Food Safety Testing Methods
                </h2>
              </div>
              <div
                style={{
                  backgroundColor: "#fef2f2",
                  padding: "1rem",
                  borderRadius: "0.75rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "0.75rem",
                    "@media (minWidth: 768px)": {
                      gridTemplateColumns: "1fr 1fr",
                    },
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #fee2e2",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "600",
                        color: "#b91c1c",
                        margin: 0,
                      }}
                    >
                      Microbiological Testing
                    </h3>
                    <p
                      style={{
                        color: "#4b5563",
                        fontSize: "0.875rem",
                        marginTop: "0.25rem",
                        marginBottom: 0,
                      }}
                    >
                      Detects harmful bacteria, fungi, and other pathogens in food
                      products
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #fee2e2",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "600",
                        color: "#b91c1c",
                        margin: 0,
                      }}
                    >
                      Chemical Analysis
                    </h3>
                    <p
                      style={{
                        color: "#4b5563",
                        fontSize: "0.875rem",
                        marginTop: "0.25rem",
                        marginBottom: 0,
                      }}
                    >
                      Identifies pesticides, additives, and other chemical
                      contaminants
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #fee2e2",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "600",
                        color: "#b91c1c",
                        margin: 0,
                      }}
                    >
                      Allergen Testing
                    </h3>
                    <p
                      style={{
                        color: "#4b5563",
                        fontSize: "0.875rem",
                        marginTop: "0.25rem",
                        marginBottom: 0,
                      }}
                    >
                      Detects common food allergens to ensure proper labeling
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #fee2e2",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "600",
                        color: "#b91c1c",
                        margin: 0,
                      }}
                    >
                      Nutritional Analysis
                    </h3>
                    <p
                      style={{
                        color: "#4b5563",
                        fontSize: "0.875rem",
                        marginTop: "0.25rem",
                        marginBottom: 0,
                      }}
                    >
                      Measures protein, fat, carbohydrates, and other nutritional
                      components
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #fee2e2",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      gridColumn: "span 2",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "600",
                        color: "#b91c1c",
                        margin: 0,
                      }}
                    >
                      Physical Testing
                    </h3>
                    <p
                      style={{
                        color: "#4b5563",
                        fontSize: "0.875rem",
                        marginTop: "0.25rem",
                        marginBottom: 0,
                      }}
                    >
                      Examines texture, color, and other physical properties of
                      food products
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: "1.5rem",
                marginTop: "2rem",
              }}
            >
              <p
                style={{
                  color: "#374151",
                  margin: 0,
                }}
              >
                This guide equips farmers with knowledge to protect themselves
                from fraud, ensure food safety, and access essential resources for
                agricultural support.
              </p>
              <div
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#f9fafb",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#9ca3af", marginRight: "0.5rem" }}
                  >
                    <path
                      d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#4b5563",
                      margin: 0,
                    }}
                  >
                    For urgent assistance or to report fraud, please contact the
                    appropriate helpline number listed above.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="flex justify-center mb-4">
        <button className="bg-white-500 " onClick={() => navigate("/")}>Home</button>

      </div>
    </>
  );
};

export default FarmLaw;
