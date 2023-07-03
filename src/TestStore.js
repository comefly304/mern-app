<div className="mt-2">
                {!auth?.token || !cart?.length ? (
                  "Please add some items to make payment"
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    {/* <button
                      className="btn btn-primary mb-3"
                      onClick={() => {
                        navigate("/dashboard/user/orders");
                        toast.success("Payment successful");
                        setcart([]);
                        localStorage.removeItem("cart");
                      }}
                    >
                      Make payment
                    </button> */}
                    <button
                      className="btn btn-primary mb-3"
                      onClick={handlePayment}
                      disabled={
                        loading ||
                        !instance ||
                        !auth?.user?.address ||
                        !clientToken ||
                        !auth?.token
                      }
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div> 
              