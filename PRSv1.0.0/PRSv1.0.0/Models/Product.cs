using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PRSv1._0._0.Models {
    public class Product {
        [Key]
        public int Id { get; set; }
        [StringLength(30)]
        [Required]
        public string PartNbr { get; set; }
        [Required]
        [StringLength(30)]
        public string Name { get; set; }
        [Required]
        [RegularExpression(@"^\d+(\.\d{1,2})?$")]
        [Range(0, 99999999999.99)]
        public decimal Price { get; set; }
        [Required]
        [MaxLength(30)]
        public string Unit { get; set; }
        [StringLength(255)]
        public string PhotoPath { get; set; }
        [DisplayName("Vendor")]
        public int VendorId { get; set; }
        public virtual Vendor Vendor { get; set; }

        
    }
}
