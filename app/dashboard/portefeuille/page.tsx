"use client";
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  note: string | null;
  createdAt: string;
}

const typeConfig: Record<string, { label: string; color: string }> = {
  DEPOSIT:       { label: "Dépôt",    color: "#34d399" },
  ORDER_PAYMENT: { label: "Commande", color: "#f87171" },
  REFUND:        { label: "Remboursement", color: "#34d399" },
};

const WHOP_PRODUCTS = [
  { label: "$5", amount: 5 },
  { label: "$10", amount: 10 },
  { label: "$25", amount: 25 },
  { label: "$50", amount: 50 },
  { label: "$100", amount: 100 },
];

export default function PortefeuillePage() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portefeuille")
      .then(r => r.json())
      .then(data => {
        setBalance(data.balance ?? 0);
        setTransactions(data.transactions ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  const whopLink = (amount: number) =>
    `${process.env.NEXT_PUBLIC_WHOP_STORE_URL || "#"}?amount=${amount}`;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-sm" style={{ color: "#6b7280" }}>Chargement...</div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Portefeuille</h1>
        <p className="mt-1 text-sm" style={{ color: "#9ca3af" }}>Gérez votre solde et rechargez via Whop</p>
      </div>

      {/* Balance */}
      <div className="p-6 rounded-xl mb-6" style={{ background: "linear-gradient(135deg, #4c1d95, #7c3aed)", border: "1px solid #6d28d9" }}>
        <div className="text-sm font-medium text-purple-200 mb-1">Solde disponible</div>
        <div className="text-4xl font-bold text-white">${balance.toFixed(2)}</div>
        <div className="text-xs text-purple-300 mt-2">USD</div>
      </div>

      {/* Deposit */}
      <div className="p-5 rounded-xl mb-6" style={{ background: "#1a1a24", border: "1px solid #2e2e3e" }}>
        <h2 className="font-semibold text-white mb-1">Recharger via Whop</h2>
        <p className="text-sm mb-4" style={{ color: "#9ca3af" }}>
          Choisissez un montant — vous serez redirigé vers Whop pour payer. Votre solde sera crédité automatiquement.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {WHOP_PRODUCTS.map(({ label, amount }) => (
            <a
              key={amount}
              href={whopLink(amount)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-80"
              style={{ background: "#7c3aed", fontSize: "1.1rem" }}
            >
              {label}
            </a>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: "#6b7280" }}>
          Après le paiement, votre solde est crédité automatiquement (peut prendre quelques secondes).
        </p>
      </div>

      {/* Transactions */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a24", border: "1px solid #2e2e3e" }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: "#2e2e3e" }}>
          <h2 className="font-semibold text-white">Historique des transactions</h2>
        </div>
        {transactions.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm" style={{ color: "#6b7280" }}>Aucune transaction.</div>
        ) : (
          <div className="divide-y" style={{ borderColor: "#2e2e3e" }}>
            {transactions.map(tx => {
              const t = typeConfig[tx.type] || { label: tx.type, color: "#9ca3af" };
              const isPositive = tx.amount > 0;
              return (
                <div key={tx.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">{t.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                      {tx.note || new Date(tx.createdAt).toLocaleString("fr-FR")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold" style={{ color: isPositive ? "#34d399" : "#f87171" }}>
                      {isPositive ? "+" : ""}${Math.abs(tx.amount).toFixed(4)}
                    </div>
                    <div className="text-xs" style={{ color: "#6b7280" }}>
                      {new Date(tx.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
